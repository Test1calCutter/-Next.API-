import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export default function ErrorHandlingDoc(){
    return (
          <section id="error-handling" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Error Handling</h2>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">HTTP Status Codes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-medium">Status Code</th>
                          <th className="text-left p-3 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-3 font-mono">200</td>
                          <td className="p-3">Success</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 font-mono">400</td>
                          <td className="p-3">Bad Request - Invalid parameters</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 font-mono">404</td>
                          <td className="p-3">Not Found - Resource doesn't exist</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 font-mono">429</td>
                          <td className="p-3">Too Many Requests - Rate limit exceeded</td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-3 font-mono">500</td>
                          <td className="p-3">Internal Server Error</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Error Response Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground">
                      {`{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The specified user could not be found",
    "details": "User ID 123456789012345678 does not exist"
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Handling Errors in Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      {`async function fetchUserSafely(userId) {
  try {
    const response = await fetch(\`https://api.nextapi.dev/user/\${userId}\`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(\`API error: \${response.status}\`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    return null;
  }
}`}
                    </pre> {/* Temporary domain */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
    )
}