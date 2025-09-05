import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DJS(){
    return (
          <section id="discord-js" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Discord.js Examples</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Info Command</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get information about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get info about')
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    
    try {
      const response = await fetch(\`https://api.nextapi.dev/user/\${user.id}\`);
      const userData = await response.json();
      
      const embed = new EmbedBuilder()
        .setTitle(\`User Information: \${userData.username}\`)
        .setThumbnail(userData.avatar_url)
        .addFields(
          { name: 'ID', value: userData.id, inline: true },
          { name: 'Created', value: \`<t:\${Math.floor(new Date(userData.created_at).getTime() / 1000)}:F>\`, inline: true },
          { name: 'Account Age', value: \`\${userData.account_age_days} days\`, inline: true },
          { name: 'Bot', value: userData.bot ? 'Yes' : 'No', inline: true }
        )
        .setColor('#5865F2');
      
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ content: 'Failed to fetch user information.', ephemeral: true });
    }
  },
};`}
                    </pre> {/* Temporary domain */}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Welcome Message with Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = member.guild.channels.cache.find(
    channel => channel.name === 'welcome'
  );
  
  if (!welcomeChannel) return;
  
  try {
    // Generate welcome image
    const imageResponse = await fetch('https://api.nextapi.dev/utils/welcome-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: member.id,
        guild_name: member.guild.name,
        template: 'modern',
        background_color: '#5865F2'
      })
    });
    
    const imageData = await imageResponse.json();
    
    const embed = new EmbedBuilder()
      .setTitle(\`Welcome to \${member.guild.name}!\`)
      .setDescription(\`Hey \${member.user.username}, welcome to our server! 🎉\`)
      .setImage(imageData.image_url)
      .setColor('#00FF00');
    
    await welcomeChannel.send({ 
      content: \`<@\${member.id}>\`,
      embeds: [embed] 
    });
  } catch (error) {
    console.error('Failed to send welcome message:', error);
  }
});`}
                    </pre> {/* Temporary domain */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
    )
}