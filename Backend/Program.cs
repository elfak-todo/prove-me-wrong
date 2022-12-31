using Backend.Services;
using Redis.OM;
using Neo4j.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHostedService<IndexCreationService>();

builder.Services.AddSingleton(new RedisConnectionProvider(builder.Configuration["RedisConnectionString"]!));

builder.Services.AddSingleton(GraphDatabase.Driver(builder.Configuration["Neo4jConnectionString"]!,
        AuthTokens.Basic(builder.Configuration["Neo4jUsername"]!,
        builder.Configuration["Neo4jPassword"]!)));

//Services
builder.Services.AddScoped<IUserService, UserService>();

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
