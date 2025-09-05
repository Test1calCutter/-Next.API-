import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function ImageManipulationDoc(){
    return (
          <section id="image-manipulation" className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Image Manipulation</h2>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Caption</CardTitle>
                  <div className="flex space-x-2">
                    <Badge className="bg-red-100 text-red-800 border-red-200">In Development</Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">POST / GET</Badge>
                  </div>
                </div>
                <CardDescription>
                  Add a meme-style caption to images. Supports both direct file uploads (Base64) and remote image URLs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div>
                  <h4 className="font-semibold mb-2">Endpoints</h4>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm space-y-1">
                    <code>POST /api/caption</code> – Upload a Base64-encoded image with a caption.<br/>
                    <code>GET /api/caption?image_url=&lt;URL&gt;&caption=&lt;text&gt;</code> – Caption an image from a remote URL.
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Request Body (POST)</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground">
{`{
  "imageData": "<base64-encoded-image>",
  "captionText": "Your meme caption here"
}`}
                    </pre>
                    <p className="text-sm text-foreground mt-2">
                      `imageData` must be a Base64 string. `captionText` is the text to add to the image.
                    </p>
                  </div>
                </div>
          
                <div>
                  <h4 className="font-semibold mb-2">Query Parameters (GET)</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground">
{`?image_url=<IMAGE_URL>&caption=<YOUR_TEXT>`}
                    </pre>
                    <p className="text-sm text-foreground mt-2">
                      Provide a publicly accessible image URL and the caption text.
                    </p>
                  </div>
                </div>
          
                <div>
                  <h4 className="font-semibold mb-2">Response</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground">
{`(Returns a PNG image)
Content-Type: image/png
Content-Disposition: inline; filename="captioned_image.png"`}
                    </pre>
                    <p className="text-sm text-foreground mt-2">
                      The API returns the captioned image directly as a PNG file. If the request fails, a JSON error object is returned.
                    </p>
                  </div>
                </div>
          
              </CardContent>
            </Card>
          </section>

    )
}