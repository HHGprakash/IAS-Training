using System.IO;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RepositoryLayer;
using RepositoryLayer.Authentication;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.AdditionalSkills;
using RepositoryLayer.IRepository.AspNetUserRoles;
using RepositoryLayer.IRepository.AspNetUsers;
using RepositoryLayer.IRepository.ContractorMaster;
using RepositoryLayer.IRepository.ContractorTraining;
using RepositoryLayer.IRepository.CustomerManagement;
using RepositoryLayer.IRepository.ProgramMaster;
using RepositoryLayer.IRepository.Ranking;
using RepositoryLayer.Repository;
using RepositoryLayer.Repository.AdditionalSkills;
using RepositoryLayer.Repository.AspNetUserRoles;
using RepositoryLayer.Repository.AspNetUsers;
using RepositoryLayer.Repository.ContractorMaster;
using RepositoryLayer.Repository.ContractorTraining;
using RepositoryLayer.Repository.CustomerManagement;
using RepositoryLayer.Repository.ProgramMaster;
using RepositoryLayer.Repository.Ranking;
using ServicesLayer.IService.AspNetUserRoles;
using ServicesLayer.IService.AspNetUsers;
using ServicesLayer.IService.ContractorMaster;
using ServicesLayer.IService.ContractorTraining;
using ServicesLayer.IService.CustomerManagement;
using ServicesLayer.IService.OtherLanguage;
using ServicesLayer.IService.ProgramMaster;
using ServicesLayer.IService.Ranking;
using ServicesLayer.Service.AspNetUserRoles;
using ServicesLayer.Service.AspNetUsers;
using ServicesLayer.Service.ContractorMaster;
using ServicesLayer.Service.ContractorTrainingNs;
using ServicesLayer.Service.CustomerManagement;
using ServicesLayer.Service.OtherLanguage;
using ServicesLayer.Service.ProgramMaster;
using ServicesLayer.Service.Ranking;

namespace AuthApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddCors();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AuthApi", Version = "v1" });
            });


            // For Entity Framework  
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("myconn")));

            // For Identity  
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });

            #region Services Injected  
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IAspNetUsersRepository, AspNetUsers>();
            services.AddTransient<IContractorTrainingRepository, ContractorTrainingRepository>();
            services.AddTransient<IAdditionalSkillsRepository, AdditionalSkillsRepository>();
            services.AddTransient<ICountryRepository, CountryRepository>();
            services.AddTransient<IContractorMasterRepository, ContractorMasterRepository>();
            services.AddTransient<IProgramMasterRepository, ProgramMasterRepository>();
            services.AddTransient<IRankingRepository, RankingRespository>();
            services.AddTransient<ICommonRepository, CommonRepository>();
            services.AddTransient<IAspNetUserRolesRepository, AspNetUserRolesRepository>();

            services.AddTransient<IContractorMasterService, ContractorMasterService>();
            services.AddTransient<IProgramMasterService, ProgramMasterService>();
            services.AddTransient<ICustomerService, CustomerService>();
            services.AddTransient<IRankingService, RankingService>();
            services.AddTransient<IAspNetUsersService, AspNetUsersService>();
            services.AddTransient<IOtherLanguageService, OtherLanguageService>();
            services.AddTransient<IContractorTrainingService, ContractorTrainingService>();
            services.AddTransient<IShareService, ShareService>();
            services.AddTransient<IAspNetUserRolesService, AspNetUserRolesService>();

            //Register dapper in scope    
            services.AddScoped<IDapper, Dapperr>();
            #endregion

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AuthApi v1"));
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod());

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });
            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
