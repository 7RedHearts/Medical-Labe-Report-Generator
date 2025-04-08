// Test Types and Parameters
const testTypes = {
    // Sugar Test
    sugar: {
        name: "Blood Sugar Test",
        parameters: [
            {
                id: "fasting-glucose",
                name: "Fasting Blood Sugar",
                unit: "mg/dL",
                normalRange: { min: 70, max: 100 }
            },
            {
                id: "random-glucose",
                name: "Random Blood Sugar",
                unit: "mg/dL",
                normalRange: { min: 70, max: 140 }
            },
            {
                id: "post-prandial",
                name: "Post Prandial Blood Sugar",
                unit: "mg/dL",
                normalRange: { min: 70, max: 140 }
            }
        ]
    },
    
    // HBA1c
    hba1c: {
        name: "Glycated Hemoglobin (HbA1c)",
        parameters: [
            {
                id: "hba1c-level",
                name: "HbA1c",
                unit: "%",
                normalRange: { min: 4.0, max: 5.6 }
            }
        ]
    },
    
    // Renal Function Tests (RFTs)
    rft: {
        name: "Renal Function Tests (RFTs)",
        parameters: [
            {
                id: "blood-urea",
                name: "Blood Urea",
                unit: "mg/dL",
                normalRange: { min: 7, max: 20 }
            },
            {
                id: "serum-creatinine",
                name: "Serum Creatinine",
                unit: "mg/dL",
                normalRange: { min: 0.7, max: 1.3 }
            },
            {
                id: "uric-acid",
                name: "Uric Acid",
                unit: "mg/dL",
                normalRange: { min: 3.5, max: 7.2 }
            },
            {
                id: "sodium",
                name: "Sodium (Na+)",
                unit: "mEq/L",
                normalRange: { min: 135, max: 145 }
            },
            {
                id: "potassium",
                name: "Potassium (K+)",
                unit: "mEq/L",
                normalRange: { min: 3.5, max: 5.0 }
            },
            {
                id: "chloride",
                name: "Chloride (Cl-)",
                unit: "mEq/L",
                normalRange: { min: 98, max: 106 }
            }
        ]
    },
    
    // Liver Function Tests (LFTs)
    lft: {
        name: "Liver Function Tests (LFTs)",
        parameters: [
            {
                id: "total-bilirubin",
                name: "Total Bilirubin",
                unit: "mg/dL",
                normalRange: { min: 0.1, max: 1.2 }
            },
            {
                id: "direct-bilirubin",
                name: "Direct Bilirubin",
                unit: "mg/dL",
                normalRange: { min: 0.0, max: 0.3 }
            },
            {
                id: "sgot-ast",
                name: "SGOT (AST)",
                unit: "U/L",
                normalRange: { min: 5, max: 40 }
            },
            {
                id: "sgpt-alt",
                name: "SGPT (ALT)",
                unit: "U/L",
                normalRange: { min: 7, max: 56 }
            },
            {
                id: "alkaline-phosphatase",
                name: "Alkaline Phosphatase",
                unit: "U/L",
                normalRange: { min: 44, max: 147 }
            },
            {
                id: "total-protein",
                name: "Total Protein",
                unit: "g/dL",
                normalRange: { min: 6.0, max: 8.3 }
            },
            {
                id: "albumin",
                name: "Albumin",
                unit: "g/dL",
                normalRange: { min: 3.5, max: 5.0 }
            },
            {
                id: "globulin",
                name: "Globulin",
                unit: "g/dL",
                normalRange: { min: 2.0, max: 3.5 }
            }
        ]
    },
    
    // Lipid Profile
    lipid: {
        name: "Lipid Profile",
        parameters: [
            {
                id: "total-cholesterol",
                name: "Total Cholesterol",
                unit: "mg/dL",
                normalRange: { min: 125, max: 200 }
            },
            {
                id: "hdl-cholesterol",
                name: "HDL Cholesterol",
                unit: "mg/dL",
                normalRange: { min: 40, max: 60 }
            },
            {
                id: "ldl-cholesterol",
                name: "LDL Cholesterol",
                unit: "mg/dL",
                normalRange: { min: 0, max: 100 }
            },
            {
                id: "vldl-cholesterol",
                name: "VLDL Cholesterol",
                unit: "mg/dL",
                normalRange: { min: 5, max: 40 }
            },
            {
                id: "triglycerides",
                name: "Triglycerides",
                unit: "mg/dL",
                normalRange: { min: 10, max: 150 }
            }
        ]
    },
    
    // Vitamin D
    vitamind: {
        name: "Vitamin D Test",
        parameters: [
            {
                id: "vitamin-d3",
                name: "Vitamin D3 (25-OH)",
                unit: "ng/mL",
                normalRange: { min: 30, max: 100 }
            }
        ]
    },
    
    // Complete Blood Count (CBC)
    cbc: {
        name: "Complete Blood Count (CBC)",
        parameters: [
            {
                id: "hemoglobin",
                name: "Hemoglobin (Hb)",
                unit: "g/dL",
                normalRange: { min: 13.5, max: 17.5 }
            },
            {
                id: "rbc",
                name: "Red Blood Cells (RBC)",
                unit: "million/μL",
                normalRange: { min: 4.5, max: 5.9 }
            },
            {
                id: "wbc",
                name: "White Blood Cells (WBC)",
                unit: "thousand/μL",
                normalRange: { min: 4.5, max: 11.0 }
            },
            {
                id: "platelets",
                name: "Platelets",
                unit: "thousand/μL",
                normalRange: { min: 150, max: 450 }
            },
            {
                id: "hematocrit",
                name: "Hematocrit (HCT)",
                unit: "%",
                normalRange: { min: 41, max: 50 }
            },
            {
                id: "mcv",
                name: "Mean Corpuscular Volume (MCV)",
                unit: "fL",
                normalRange: { min: 80, max: 100 }
            },
            {
                id: "mch",
                name: "Mean Corpuscular Hemoglobin (MCH)",
                unit: "pg",
                normalRange: { min: 27, max: 34 }
            },
            {
                id: "mchc",
                name: "Mean Corpuscular Hemoglobin Concentration (MCHC)",
                unit: "g/dL",
                normalRange: { min: 32, max: 36 }
            },
            {
                id: "neutrophils",
                name: "Neutrophils",
                unit: "%",
                normalRange: { min: 40, max: 75 }
            },
            {
                id: "lymphocytes",
                name: "Lymphocytes",
                unit: "%",
                normalRange: { min: 20, max: 45 }
            },
            {
                id: "monocytes",
                name: "Monocytes",
                unit: "%",
                normalRange: { min: 2, max: 10 }
            },
            {
                id: "eosinophils",
                name: "Eosinophils",
                unit: "%",
                normalRange: { min: 1, max: 6 }
            },
            {
                id: "basophils",
                name: "Basophils",
                unit: "%",
                normalRange: { min: 0, max: 2 }
            }
        ]
    },
    
    // Calcium Test
    calcium: {
        name: "Calcium Test",
        parameters: [
            {
                id: "serum-calcium",
                name: "Serum Calcium",
                unit: "mg/dL",
                normalRange: { min: 8.6, max: 10.3 }
            }
        ]
    },
    
    // Urine R/E
    urine: {
        name: "Urine Routine Examination (R/E)",
        parameters: [
            {
                id: "urine-color",
                name: "Color",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Pale Yellow to Amber" }
            },
            {
                id: "urine-appearance",
                name: "Appearance",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Clear" }
            },
            {
                id: "urine-ph",
                name: "pH",
                unit: "",
                normalRange: { min: 4.5, max: 8.0 }
            },
            {
                id: "urine-specific-gravity",
                name: "Specific Gravity",
                unit: "",
                normalRange: { min: 1.005, max: 1.030 }
            },
            {
                id: "urine-protein",
                name: "Protein",
                unit: "mg/dL",
                normalRange: { min: 0, max: 8 }
            },
            {
                id: "urine-glucose",
                name: "Glucose",
                unit: "mg/dL",
                normalRange: { min: 0, max: 15 }
            },
            {
                id: "urine-ketones",
                name: "Ketones",
                unit: "mg/dL",
                normalRange: { min: 0, max: 0, text: "Negative" }
            },
            {
                id: "urine-blood",
                name: "Blood",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            },
            {
                id: "urine-nitrite",
                name: "Nitrite",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            },
            {
                id: "urine-leukocytes",
                name: "Leukocytes",
                unit: "/HPF",
                normalRange: { min: 0, max: 5 }
            },
            {
                id: "urine-rbc",
                name: "RBC",
                unit: "/HPF",
                normalRange: { min: 0, max: 2 }
            }
        ]
    },
    
    // Hepatitis B & C
    hepatitis: {
        name: "Hepatitis B & C Tests",
        parameters: [
            {
                id: "hbsag",
                name: "HBsAg (Hepatitis B Surface Antigen)",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            },
            {
                id: "anti-hcv",
                name: "Anti-HCV (Hepatitis C Antibody)",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            }
        ]
    },
    
    // Thyroid Profile
    thyroid: {
        name: "Thyroid Profile",
        parameters: [
            {
                id: "t3",
                name: "T3 (Triiodothyronine)",
                unit: "ng/dL",
                normalRange: { min: 80, max: 200 }
            },
            {
                id: "t4",
                name: "T4 (Thyroxine)",
                unit: "µg/dL",
                normalRange: { min: 5.0, max: 12.0 }
            },
            {
                id: "tsh",
                name: "TSH (Thyroid Stimulating Hormone)",
                unit: "µIU/mL",
                normalRange: { min: 0.3, max: 4.0 }
            },
            {
                id: "ft3",
                name: "Free T3",
                unit: "pg/mL",
                normalRange: { min: 2.3, max: 4.2 }
            },
            {
                id: "ft4",
                name: "Free T4",
                unit: "ng/dL",
                normalRange: { min: 0.8, max: 1.8 }
            }
        ]
    },
    
    // Malaria Test
    malaria: {
        name: "Malaria Test",
        parameters: [
            {
                id: "malaria-parasite",
                name: "Malaria Parasite",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Not Detected" }
            },
            {
                id: "malaria-species",
                name: "Parasite Species (if detected)",
                unit: "",
                normalRange: { min: 0, max: 0, text: "N/A" }
            }
        ]
    },
    
    // HIV Test
    hiv: {
        name: "HIV Test",
        parameters: [
            {
                id: "hiv-antibody",
                name: "HIV Antibody",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            }
        ]
    },
    
    // Dengue Test
    dengue: {
        name: "Dengue Test",
        parameters: [
            {
                id: "dengue-ns1-antigen",
                name: "Dengue NS1 Antigen",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            },
            {
                id: "dengue-igg",
                name: "Dengue IgG",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            },
            {
                id: "dengue-igm",
                name: "Dengue IgM",
                unit: "",
                normalRange: { min: 0, max: 0, text: "Negative" }
            }
        ]
    },
    
    // Pregnancy Test
    pregnancy: {
        name: "Pregnancy Test",
        parameters: [
            {
                id: "beta-hcg",
                name: "Beta-hCG",
                unit: "mIU/mL",
                normalRange: { min: 0, max: 5, text: "Negative" }
            }
        ]
    }
};