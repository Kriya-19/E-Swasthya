import { useState } from "react";
import {
  AlertTriangle,
  User,
  ArrowRight,
  Loader2,
} from "lucide-react";
import axios from "axios";
import T from "@/components/T";

import PatientLayout from "@/components/layouts/PatientLayout";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { symptoms } from "@/data/mockData";
import { cn } from "@/lib/utils";

const AIPrediction = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((s) => s !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length > 0 && age && gender) {
      setIsLoading(true);
      setError(null);
      try {
        const sentence = selectedSymptoms
          .map((id) => symptoms.find((s) => s.id === id)?.name)
          .join(", ");

        const response = await axios.post("http://localhost:5001/api/chatbot/predict", {
          sentence: `I am ${age} years old ${gender} and I have ${sentence}`,
        });

        if (response.data && response.data.top_diagnosis) {
          setPrediction(response.data.top_diagnosis);
          setShowResult(true);
        } else {
          throw new Error("Invalid response from AI");
        }
      } catch (err: any) {
        console.error("AI Prediction Error:", err);
        setError(err.response?.data?.error || "Failed to get AI prediction. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };


  const InfoSection = ({
    title,
    items,
  }: {
    title: string;
    items: string[];
  }) => (
    <div className="p-4 bg-muted/50 rounded-xl">
      <h3 className="font-semibold text-secondary mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="font-medium">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <PatientLayout>
      <div className="bg-primary/30 m-6 p-8 rounded-[2.5rem]">
        <Breadcrumbs />

        {!showResult ? (
          <div className="bg-card rounded-2xl p-8 space-y-6">
            <Label className="text-lg font-semibold">
              <T>Select Symptoms</T>
            </Label>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-medium transition-all",
                    selectedSymptoms.includes(symptom.id)
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-border bg-muted/30 hover:border-secondary/50"
                  )}
                >
                  {symptom.name}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male"><T>Male</T></SelectItem>
                  <SelectItem value="female"><T>Female</T></SelectItem>
                  <SelectItem value="other"><T>Other</T></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!age || !gender || selectedSymptoms.length === 0 || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <T>Analyzing...</T>
                </>
              ) : (
                <>
                  <T>Analyze Symptoms</T>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-card border p-6 md:p-8 space-y-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <T>Possible Condition</T>
                  </p>
                  <h2 className="text-2xl font-bold text-secondary">
                    {prediction?.condition || "Unknown Condition"}
                  </h2>
                </div>
                <StatusBadge status={prediction?.confidence > 0.7 ? "high" : "medium"} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InfoSection
                  title="Description"
                  items={prediction?.description ? [prediction.description] : ["No description available."]}
                />
                <InfoSection
                  title="Medications"
                  items={prediction?.medications?.length > 0 ? prediction.medications : ["Consult a doctor for medication."]}
                />
                <InfoSection
                  title="Diet"
                  items={prediction?.diet?.length > 0 ? prediction.diet : ["Maintain a balanced diet."]}
                />
                <InfoSection
                  title="Precautions"
                  items={prediction?.precautions?.length > 0 ? prediction.precautions : ["General rest and hydration."]}
                />
              </div>

              <div className="flex gap-4">
                <Button className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  <T>Consult Doctor</T>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowResult(false)}
                >
                  <T>Check Again</T>
                </Button>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-warning/10 border border-warning/20 rounded-xl">
              <AlertTriangle className="text-warning" />
              <p className="text-sm text-muted-foreground">
                <T>This is not a medical diagnosis. Consult a healthcare professional.</T>
              </p>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default AIPrediction;