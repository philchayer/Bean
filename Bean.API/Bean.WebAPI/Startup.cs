using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Bean.WebAPI.Startup))]

namespace Bean.WebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // enable cors on the entire API
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureAuth(app);
        }
    }
}
