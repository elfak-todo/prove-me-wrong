using Backend.Services;
using Redis.OM;
using Neo4jClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHostedService<IndexCreationService>();

builder.Services.AddSingleton(new RedisConnectionProvider(builder.Configuration["RedisConnectionString"]!));

var client = new BoltGraphClient(builder.Configuration["Neo4jConnectionString"]!,
        builder.Configuration["Neo4jUsername"]!,
        builder.Configuration["Neo4jPassword"]!);

client.ConnectAsync();
builder.Services.AddSingleton<IGraphClient>(client);

//Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IPostService, PostService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
