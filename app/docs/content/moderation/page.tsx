import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function Moderation(){
    return (
          <section id="moderation" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Moderation API</h2>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Content Filter</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">POST</Badge>
                </div>
                <CardDescription>
                  Check text content for inappropriate material using AI-powered filtering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Endpoint</h4>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    <code>POST /moderation/profanity?message={'"hello"'}</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Request Body</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground">
                      {`{
  "content": "Text content to analyze",
  "strict": false
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Response</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`{
  "flagged": false,
  "confidence": 0.95,
  "categories": {
    "hate": false,
    "harassment": false,
    "violence": false,
    "sexual": false,
    "spam": false
  },
  "action": "allow"
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

    )
}