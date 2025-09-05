import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Utilities(){
    return (
        <section id="utilities" className="mb-12 space-y-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">Utilities API</h2>

            {/* Text editing */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Text Editing</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">POST</Badge>
                    </div>
                    <CardDescription>
                        Transform text with multiple utilities: reverse, base64, lowercase, uppercase, URL encoding, or uwuify.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Endpoints</h4>
                        <div className="bg-muted p-3 rounded-lg font-mono text-sm space-y-1">
                            <code>/api/utility/text/reverse/</code><br/>
                            <code>/api/utility/text/lowercase/</code><br/>
                            <code>/api/utility/text/uppercase/</code><br/>
                            <code>/api/utility/text/uwuify/</code><br/>
                            <code>/api/utility/text/base64/</code> (requires `"mode": "encode"` or `"mode": "decode"`)<br/>
                            <code>/api/utility/text/url/</code> (requires `"mode": "encode"` or `"mode": "decode"`)
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Request Body</h4>
                        <div className="bg-muted p-4 rounded-lg">
                            <pre className="text-sm text-foreground">
{`{
  "text": "Hello World!",
  "mode": "encode" // only required for base64 and url
}`}
                            </pre>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Response</h4>
                        <div className="bg-muted p-4 rounded-lg">
                            <pre className="text-sm text-foreground">
{`{
  "original": "Hello World!",
  "result": "SGVsbG8gV29ybGQh" // or transformed text depending on endpoint
}`}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            <br />

            {/* User */}
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">User</CardTitle>
                        <Badge className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                    </div>
                    <CardDescription>
                        Fetches details about the authenticated user.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Endpoint</h4>
                        <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>/api/utility/user/</code>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Response</h4>
                        <div className="bg-muted p-4 rounded-lg">
                            <pre className="text-sm text-foreground">
{`{
  "id": "user-1234",
  "name": "John Doe",
  "email": "john.doe@example.com"
}`}
                            </pre>
                        </div>
                    </div>
                </CardContent>

            {/* Reminder */}
            <br />
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Reminder</CardTitle>
                        <div className="flex space-x-2">
                            <Badge className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">POST</Badge>
                        </div>
                    </div>
                    <CardDescription>
                        Create a reminder for the authenticated user or fetch a list of existing reminders.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Endpoint</h4>
                        <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                            <code>/api/utility/reminder/</code>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">GET Request</h4>
                        <p className="text-sm mb-2">No request body required. Fetches all reminders for the current user.</p>
                        <div className="bg-muted p-4 rounded-lg">
                            <pre className="text-sm text-foreground">
{`{
  "reminders": [
    {
      "id": "abc12345",
      "userId": "user-1234",
      "message": "Remember to buy milk!",
      "time": 1756089600 // Unix timestamp
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">POST Request</h4>
                        <p className="text-sm mb-2">Creates a new reminder.</p>
                        <div className="bg-muted p-4 rounded-lg space-y-2">
                            <h5 className="font-medium">Request Body</h5>
                            <pre className="text-sm text-foreground">
{`{
  "text": "Your reminder message",
  "delay": 3600 // Delay in seconds (e.g., 1 hour)
}`}
                            </pre>
                            <h5 className="font-medium">Response</h5>
                            <pre className="text-sm text-foreground">
{`{
  "success": true,
  "reminder": {
    "id": "xyz67890",
    "userId": "user-1234",
    "message": "Your reminder message",
    "time": 1756093200
  }
}`}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            <br />

            {/* Generator */}
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">Generators</CardTitle>
                        <div className="flex space-x-2">
                            <Badge className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                            <Badge className="bg-blue-100 text-blue-800 border-blue-200">POST</Badge>
                        </div>
                    </div>
                    <CardDescription>
                        Endpoints for generating random values and timestamps.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Endpoints</h4>
                        <div className="bg-muted p-3 rounded-lg font-mono text-sm space-y-1">
                            <code>/api/utility/generate/random</code><br />
                            <code>/api/utility/generate/timestamp</code>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2">Random Generator</h4>
                        <p className="text-sm mb-2">Generate a random number, flip a coin, roll a dice, or choose from a list.</p>
                        <div className="bg-muted p-4 rounded-lg">
                            <h5 className="font-medium mb-2">Parameters (GET/POST)</h5>
                            <pre className="text-sm text-foreground">
{`?type=number|coin|dice|choice
&min=...
&max=...
&options=...`}
                            </pre>
                            <h5 className="font-medium mt-4 mb-2">Example Response</h5>
                            <pre className="text-sm text-foreground">
{`{
  "type": "dice",
  "output": 4
}`}
                            </pre>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-semibold mb-2">Timestamp Generator</h4>
                        <p className="text-sm mb-2">Converts a simple time string into a Unix timestamp and Discord-compatible relative timestamp.</p>
                        <div className="bg-muted p-4 rounded-lg">
                            <h5 className="font-medium mb-2">Parameters (GET/POST)</h5>
                            <pre className="text-sm text-foreground">
{`?text=... (e.g., "1h30m", "5m")`}
                            </pre>
                            <h5 className="font-medium mt-4 mb-2">Example Response</h5>
                            <pre className="text-sm text-foreground">
{`{
  "input": "1h10m",
  "unix": 1756096800,
  "discord": "<t:1756096800:R>"
}`}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </section>
    )
}