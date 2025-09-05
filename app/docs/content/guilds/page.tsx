import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function guilds(){
    return (
          <section id="guilds" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Guilds API</h2>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Get Guild Info</CardTitle>
                  <Badge className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                </div>
                <CardDescription>Retrieve basic information about a Discord server.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    <code>GET /guild/{"{guild_id}"}</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Response</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`{
  "id": "987654321098765432",
  "name": "Example Server",
  "icon": "guild_icon_hash",
  "icon_url": "https://cdn.discordapp.com/icons/987654321098765432/guild_icon_hash.png",
  "member_count": 1250,
  "created_at": "2019-06-15T10:30:00.000Z",
  "verification_level": 2,
  "features": ["COMMUNITY", "NEWS"]
}`}
                    </pre> {/* Temporary domain */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
    )
}