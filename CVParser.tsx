import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CVParser() {
  const [cvText, setCvText] = useState("");
  const [optimizedCV, setOptimizedCV] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("text", cvText);

    const response = await fetch("/api/parse-cv", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setOptimizedCV(data.optimized_cv);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">AI CV Optimizer for Seafarers</h2>
      <Textarea
        value={cvText}
        onChange={(e) => setCvText(e.target.value)}
        placeholder="Paste your current CV here..."
        className="min-h-[200px] mb-4"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Optimizing..." : "Generate ATS CV"}
      </Button>

      {optimizedCV && (
        <Card className="mt-6">
          <CardContent>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {optimizedCV}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
