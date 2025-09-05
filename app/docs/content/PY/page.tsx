import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function PY(){
    return (
          <section id="python" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Discord.py Examples</h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">User Info Command (Python)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm text-foreground overflow-x-auto">
                    {`import discord
from discord.ext import commands
import aiohttp
import asyncio

class UserInfo(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
    
    @commands.slash_command(description="Get information about a user")
    async def userinfo(self, ctx, user: discord.User):
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f'https://api.nextapi.dev/user/{user.id}') as response:
                    if response.status == 200:
                        data = await response.json()
                        
                        embed = discord.Embed(
                            title=f"User Information: {data['username']}",
                            color=0x5865F2
                        )
                        embed.set_thumbnail(url=data['avatar_url'])
                        embed.add_field(name="ID", value=data['id'], inline=True)
                        embed.add_field(name="Created", value=data['created_at'], inline=True)
                        embed.add_field(name="Account Age", value=f"{data['account_age_days']} days", inline=True)
                        embed.add_field(name="Bot", value="Yes" if data['bot'] else "No", inline=True)
                        
                        await ctx.respond(embed=embed)
                    else:
                        await ctx.respond("Failed to fetch user information.", ephemeral=True)
            except Exception as e:
                await ctx.respond("An error occurred while fetching user information.", ephemeral=True)

def setup(bot):
    bot.add_cog(UserInfo(bot))`} 
                  </pre> {/* Temporary domain */}
                </div>
              </CardContent>
            </Card>
          </section>
    )
}