import evidenceData from "@/data/evidence_repository.json";

export interface CaseEvidence {
  id: string;
  title: string;
  clientType: string;
  property: string;
  suburb: string;
  fabricSpecs: string;
  baselineProblem: string;
  intervention: string;
  measurableOutcome: string;
  turnaroundTime: string;
  customerFeedback: string;
  verified: boolean;
  date: string;
}

export const evidenceRepository = {
  getAll(): CaseEvidence[] {
    return evidenceData as CaseEvidence[];
  },

  getBySuburb(suburb: string): CaseEvidence[] {
    const s = suburb.toLowerCase();
    return (evidenceData as CaseEvidence[]).filter((item) =>
      item.suburb.toLowerCase().includes(s) || item.property.toLowerCase().includes(s)
    );
  },

  getByClientType(type: string): CaseEvidence[] {
    const t = type.toLowerCase();
    return (evidenceData as CaseEvidence[]).filter((item) =>
      item.clientType.toLowerCase().includes(t)
    );
  },

  getById(id: string): CaseEvidence | undefined {
    return (evidenceData as CaseEvidence[]).find((item) => item.id === id);
  },
};
