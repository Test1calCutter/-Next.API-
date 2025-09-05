import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy } from "lucide-react"


export default function Users(){
    return (
        <section id="users" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Users API</h2>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Get User</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                  </div>
                  <CardDescription>Retrieve information about a Discord user by their ID.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Endpoint</h4>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm flex items-center justify-between">
                      <code>GET /user/{"{user_id}"}</code>
                      <Button variant="ghost" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-3 font-medium">Parameter</th>
                            <th className="text-left p-3 font-medium">Type</th>
                            <th className="text-left p-3 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t">
                            <td className="p-3 font-mono">user_id</td>
                            <td className="p-3">string</td>
                            <td className="p-3">Discord user ID (snowflake)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Response</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm text-foreground overflow-x-auto">
                        {`{
  "id": "123456789012345678",
  "username": "ExampleUser",
  "discriminator": "1234",
  "global_name": "Example User",
  "avatar": "a1b2c3d4e5f6g7h8i9j0",
  "avatar_url": "https://cdn.discordapp.com/avatars/123456789012345678/a1b2c3d4e5f6g7h8i9j0.png",
  "bot": false,
  "system": false,
  "public_flags": 0,
  "created_at": "2020-01-01T00:00:00.000Z",
  "account_age_days": 1461
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example Request</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm text-foreground">
                        {`curl -X GET "https://api.nextapi.dev/user/123456789012345678"`}
                      </pre> {/* Temporary domain */}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Get User Avatar</CardTitle>
                    <Badge className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                  </div>
                  <CardDescription>Get a user's avatar in default size and format in URL style.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Endpoint</h4>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      <code>GET /user/avatar/{"{user_id}"}</code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
    )
}