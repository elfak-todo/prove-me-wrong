using Backend.Services;
using Redis.OM;
using Neo4jClient;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(new RedisConnectionProvider(builder.Configuration["Redis:ConnectionString"]!));

var client = new BoltGraphClient(builder.Configuration["Neo4j:ConnectionString"]!,
        builder.Configuration["Neo4j:Username"]!,
        builder.Configuration["Neo4j:Password"]!);

client.ConnectAsync();
builder.Services.AddSingleton<IGraphClient>(client);

builder.Services.AddSignalR();

//Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPasswordManager, PasswordManager>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IPostService, PostService>();
builder.Services.AddScoped<ITagService, TagService>();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORS");

app.UseHttpsRedirection();

app.UseMiddleware<AuthMiddleware>();

var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

webSocketOptions.AllowedOrigins.Add("http://localhost:3000");

app.UseWebSockets(webSocketOptions);
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.Run();
