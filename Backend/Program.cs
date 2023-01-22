using Backend.Services;
using StackExchange.Redis;
using Neo4jClient;
using Backend.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// [Neo4j]

var neo4jClient = new BoltGraphClient(builder.Configuration["Neo4j:ConnectionString"]!,
        builder.Configuration["Neo4j:Username"]!,
        builder.Configuration["Neo4j:Password"]!);
neo4jClient.ConnectAsync();
builder.Services.AddSingleton<IGraphClient>(neo4jClient);

// [Redis]

var redisClient = ConnectionMultiplexer.Connect(builder.Configuration["Redis:ConnectionString"]!);
builder.Services.AddSingleton<IConnectionMultiplexer>(redisClient);

builder.Services.AddSignalR();

// [Services]

//Kreira inicijalne tagove ako vec nisu kreirani.
var tagService = new TagService(neo4jClient);
tagService.CreateDefaultAsync();

builder.Services.AddSingleton<ITagService>(tagService);
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPasswordManager, PasswordManager>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ICommentService, CommentService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:8080",
                                              "http://localhost:7246",
                                              "http://localhost:3000",
                                              "https://localhost:8080",
                                              "http://127.0.0.1:8080",
                                              "https://127.0.0.1:8080",
                                              "https://127.0.0.1:5500",
                                              "http://127.0.0.1:5500",
                                              "http://127.0.0.1:5500",
                                              "http://localhost:5500",
                                              "https://localhost:5500",
                                              "http://192.168.1.35:3000",
                                              "http://192.168.100.2:3000")
                                              .AllowAnyHeader()
                                              .AllowAnyMethod()
                                              .AllowCredentials();
                      });

});

builder.Services.AddAuthentication();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapHub<ChatHub>("/ChatHub");
app.MapControllers();

app.UseCors("CORS");
app.UseHttpsRedirection();
app.UseMiddleware<AuthMiddleware>();

app.Run();