import { v4 as uuidv4 } from 'uuid';
import { db, initializeDatabase } from '../database/database';

const categories = [
  {
    id: uuidv4(),
    name: 'Heart Care',
    description: 'Cardiovascular medicines and supplements for heart health',
    image: 'heart-care.jpg'
  },
  {
    id: uuidv4(),
    name: 'Brain & Mental Health',
    description: 'Neurological and mental health medications',
    image: 'brain-health.jpg'
  },
  {
    id: uuidv4(),
    name: 'Eye Care',
    description: 'Ophthalmic medicines and eye drops',
    image: 'eye-care.jpg'
  },
  {
    id: uuidv4(),
    name: 'Family Care',
    description: 'Healthcare products for the entire family',
    image: 'family-care.jpg'
  },
  {
    id: uuidv4(),
    name: 'Wellness',
    description: 'Vitamins, supplements and wellness products',
    image: 'wellness.jpg'
  },
  {
    id: uuidv4(),
    name: 'General Medicine',
    description: 'Common medications and treatments',
    image: 'general-medicine.jpg'
  },
  {
    id: uuidv4(),
    name: 'Pain Relief',
    description: 'Pain management and relief medications',
    image: 'pain-relief.jpg'
  },
  {
    id: uuidv4(),
    name: 'Diabetes Care',
    description: 'Diabetes management and monitoring products',
    image: 'diabetes-care.jpg'
  }
];

const generateMedicines = () => {
  const medicines: any[] = [];
  
  // Heart Care Medicines
  const heartMedicines = [
    { name: 'Atorvastatin 20mg', activeIngredient: 'Atorvastatin', dosage: '20mg', price: 45.99, originalPrice: 52.99, prescription: true, description: 'Cholesterol-lowering medication for heart health' },
    { name: 'Lisinopril 10mg', activeIngredient: 'Lisinopril', dosage: '10mg', price: 18.99, originalPrice: 22.99, prescription: true, description: 'ACE inhibitor for blood pressure management' },
    { name: 'Metoprolol 50mg', activeIngredient: 'Metoprolol', dosage: '50mg', price: 28.50, originalPrice: 32.99, prescription: true, description: 'Beta-blocker for heart rate control' },
    { name: 'Aspirin 81mg', activeIngredient: 'Aspirin', dosage: '81mg', price: 8.99, originalPrice: 12.99, prescription: false, description: 'Low-dose aspirin for heart protection' },
    { name: 'Clopidogrel 75mg', activeIngredient: 'Clopidogrel', dosage: '75mg', price: 65.99, originalPrice: 78.99, prescription: true, description: 'Blood thinner to prevent clots' },
    { name: 'Amlodipine 5mg', activeIngredient: 'Amlodipine', dosage: '5mg', price: 22.99, originalPrice: 27.99, prescription: true, description: 'Calcium channel blocker for blood pressure' },
    { name: 'Rosuvastatin 10mg', activeIngredient: 'Rosuvastatin', dosage: '10mg', price: 42.99, originalPrice: 49.99, prescription: true, description: 'High-intensity statin for cholesterol' },
    { name: 'Losartan 50mg', activeIngredient: 'Losartan', dosage: '50mg', price: 35.99, originalPrice: 41.99, prescription: true, description: 'ARB for blood pressure management' },
    { name: 'Digoxin 0.25mg', activeIngredient: 'Digoxin', dosage: '0.25mg', price: 19.99, originalPrice: 24.99, prescription: true, description: 'Heart rhythm medication' },
    { name: 'Warfarin 5mg', activeIngredient: 'Warfarin', dosage: '5mg', price: 15.99, originalPrice: 19.99, prescription: true, description: 'Anticoagulant for blood clot prevention' },
    { name: 'CoQ10 100mg', activeIngredient: 'Coenzyme Q10', dosage: '100mg', price: 24.99, originalPrice: 29.99, prescription: false, description: 'Heart health supplement' },
    { name: 'Omega-3 Fish Oil', activeIngredient: 'EPA/DHA', dosage: '1000mg', price: 34.99, originalPrice: 39.99, prescription: false, description: 'Supports heart and brain health' },
    { name: 'Diltiazem 120mg', activeIngredient: 'Diltiazem', dosage: '120mg', price: 38.99, originalPrice: 44.99, prescription: true, description: 'Calcium channel blocker for angina' },
    { name: 'Furosemide 40mg', activeIngredient: 'Furosemide', dosage: '40mg', price: 12.99, originalPrice: 16.99, prescription: true, description: 'Diuretic for fluid retention' },
    { name: 'Carvedilol 25mg', activeIngredient: 'Carvedilol', dosage: '25mg', price: 31.99, originalPrice: 37.99, prescription: true, description: 'Beta-blocker for heart failure' }
  ];

  // Pain Relief Medicines
  const painMedicines = [
    { name: 'Paracetamol 500mg', activeIngredient: 'Paracetamol', dosage: '500mg', price: 12.99, originalPrice: 15.99, prescription: false, description: 'Effective pain relief and fever reducer' },
    { name: 'Ibuprofen 400mg', activeIngredient: 'Ibuprofen', dosage: '400mg', price: 14.99, originalPrice: 17.99, prescription: false, description: 'Anti-inflammatory pain reliever' },
    { name: 'Aspirin 325mg', activeIngredient: 'Aspirin', dosage: '325mg', price: 9.99, originalPrice: 13.99, prescription: false, description: 'Pain relief and anti-inflammatory' },
    { name: 'Naproxen 220mg', activeIngredient: 'Naproxen', dosage: '220mg', price: 16.99, originalPrice: 19.99, prescription: false, description: 'Long-lasting pain relief' },
    { name: 'Diclofenac Gel', activeIngredient: 'Diclofenac', dosage: '1% gel', price: 18.99, originalPrice: 22.99, prescription: false, description: 'Topical pain relief for joints' },
    { name: 'Tramadol 50mg', activeIngredient: 'Tramadol', dosage: '50mg', price: 45.99, originalPrice: 52.99, prescription: true, description: 'Strong pain relief medication' },
    { name: 'Acetaminophen Extra Strength', activeIngredient: 'Acetaminophen', dosage: '500mg', price: 11.99, originalPrice: 14.99, prescription: false, description: 'Extra strength pain and fever relief' },
    { name: 'Meloxicam 15mg', activeIngredient: 'Meloxicam', dosage: '15mg', price: 32.99, originalPrice: 38.99, prescription: true, description: 'Anti-inflammatory for arthritis' },
    { name: 'Celecoxib 200mg', activeIngredient: 'Celecoxib', dosage: '200mg', price: 78.99, originalPrice: 89.99, prescription: true, description: 'COX-2 inhibitor for arthritis pain' },
    { name: 'Topical Lidocaine', activeIngredient: 'Lidocaine', dosage: '4% cream', price: 21.99, originalPrice: 26.99, prescription: false, description: 'Numbing cream for localized pain' }
  ];

  // Wellness & Vitamins
  const wellnessMedicines = [
    { name: 'Vitamin D3 1000 IU', activeIngredient: 'Cholecalciferol', dosage: '1000 IU', price: 24.99, originalPrice: 29.99, prescription: false, description: 'Essential vitamin for bone and immune health' },
    { name: 'Multivitamin Complex', activeIngredient: 'Mixed Vitamins', dosage: '1 tablet', price: 21.99, originalPrice: 27.99, prescription: false, description: 'Complete daily nutrition support' },
    { name: 'Vitamin B12 1000mcg', activeIngredient: 'Cyanocobalamin', dosage: '1000mcg', price: 18.99, originalPrice: 23.99, prescription: false, description: 'Energy and nervous system support' },
    { name: 'Iron Supplement 65mg', activeIngredient: 'Iron Sulfate', dosage: '65mg', price: 15.99, originalPrice: 19.99, prescription: false, description: 'Iron deficiency supplement' },
    { name: 'Calcium + Vitamin D', activeIngredient: 'Calcium Carbonate', dosage: '500mg', price: 19.99, originalPrice: 24.99, prescription: false, description: 'Bone health support' },
    { name: 'Magnesium 400mg', activeIngredient: 'Magnesium Oxide', dosage: '400mg', price: 17.99, originalPrice: 22.99, prescription: false, description: 'Muscle and nerve function support' },
    { name: 'Zinc 50mg', activeIngredient: 'Zinc Sulfate', dosage: '50mg', price: 14.99, originalPrice: 18.99, prescription: false, description: 'Immune system support' },
    { name: 'Vitamin C 1000mg', activeIngredient: 'Ascorbic Acid', dosage: '1000mg', price: 16.99, originalPrice: 20.99, prescription: false, description: 'Antioxidant and immune support' },
    { name: 'Probiotics 10 Billion CFU', activeIngredient: 'Mixed Probiotics', dosage: '10B CFU', price: 32.99, originalPrice: 39.99, prescription: false, description: 'Digestive health support' },
    { name: 'Turmeric Curcumin', activeIngredient: 'Curcumin', dosage: '500mg', price: 28.99, originalPrice: 34.99, prescription: false, description: 'Anti-inflammatory supplement' }
  ];

  // Brain & Mental Health
  const brainMedicines = [
    { name: 'Sertraline 50mg', activeIngredient: 'Sertraline', dosage: '50mg', price: 42.99, originalPrice: 49.99, prescription: true, description: 'SSRI for depression and anxiety' },
    { name: 'Escitalopram 10mg', activeIngredient: 'Escitalopram', dosage: '10mg', price: 38.99, originalPrice: 45.99, prescription: true, description: 'Antidepressant for anxiety disorders' },
    { name: 'Lorazepam 1mg', activeIngredient: 'Lorazepam', dosage: '1mg', price: 29.99, originalPrice: 35.99, prescription: true, description: 'Anti-anxiety medication' },
    { name: 'Zolpidem 10mg', activeIngredient: 'Zolpidem', dosage: '10mg', price: 35.99, originalPrice: 42.99, prescription: true, description: 'Sleep aid medication' },
    { name: 'Melatonin 3mg', activeIngredient: 'Melatonin', dosage: '3mg', price: 12.99, originalPrice: 16.99, prescription: false, description: 'Natural sleep support' },
    { name: 'Donepezil 10mg', activeIngredient: 'Donepezil', dosage: '10mg', price: 89.99, originalPrice: 105.99, prescription: true, description: 'Alzheimer\'s disease treatment' },
    { name: 'Ginkgo Biloba 120mg', activeIngredient: 'Ginkgo Extract', dosage: '120mg', price: 19.99, originalPrice: 24.99, prescription: false, description: 'Memory and cognitive support' },
    { name: 'Venlafaxine 75mg', activeIngredient: 'Venlafaxine', dosage: '75mg', price: 46.99, originalPrice: 54.99, prescription: true, description: 'SNRI for depression' },
    { name: 'Trazodone 50mg', activeIngredient: 'Trazodone', dosage: '50mg', price: 31.99, originalPrice: 38.99, prescription: true, description: 'Antidepressant with sedative effects' },
    { name: 'Omega-3 Brain Health', activeIngredient: 'DHA/EPA', dosage: '1200mg', price: 39.99, originalPrice: 46.99, prescription: false, description: 'Brain function support' }
  ];

  // Eye Care
  const eyeMedicines = [
    { name: 'Artificial Tears', activeIngredient: 'Polyethylene Glycol', dosage: '0.4%', price: 8.99, originalPrice: 11.99, prescription: false, description: 'Dry eye relief drops' },
    { name: 'Timolol Eye Drops', activeIngredient: 'Timolol', dosage: '0.5%', price: 34.99, originalPrice: 41.99, prescription: true, description: 'Glaucoma treatment drops' },
    { name: 'Prednisolone Eye Drops', activeIngredient: 'Prednisolone', dosage: '1%', price: 28.99, originalPrice: 34.99, prescription: true, description: 'Anti-inflammatory eye drops' },
    { name: 'Cyclosporine Eye Drops', activeIngredient: 'Cyclosporine', dosage: '0.05%', price: 145.99, originalPrice: 168.99, prescription: true, description: 'Dry eye treatment' },
    { name: 'Allergy Eye Drops', activeIngredient: 'Ketotifen', dosage: '0.025%', price: 12.99, originalPrice: 16.99, prescription: false, description: 'Antihistamine eye drops' },
    { name: 'Lubricating Eye Ointment', activeIngredient: 'Petrolatum', dosage: '3.5g', price: 9.99, originalPrice: 13.99, prescription: false, description: 'Overnight eye protection' },
    { name: 'Dorzolamide Eye Drops', activeIngredient: 'Dorzolamide', dosage: '2%', price: 52.99, originalPrice: 62.99, prescription: true, description: 'Carbonic anhydrase inhibitor for glaucoma' },
    { name: 'Bimatoprost Eye Drops', activeIngredient: 'Bimatoprost', dosage: '0.03%', price: 78.99, originalPrice: 92.99, prescription: true, description: 'Prostaglandin analog for glaucoma' },
    { name: 'Ofloxacin Eye Drops', activeIngredient: 'Ofloxacin', dosage: '0.3%', price: 18.99, originalPrice: 23.99, prescription: true, description: 'Antibiotic eye drops' },
    { name: 'Vitamin A Eye Drops', activeIngredient: 'Retinyl Palmitate', dosage: '0.01%', price: 15.99, originalPrice: 19.99, prescription: false, description: 'Eye health vitamin supplement' }
  ];

  // Diabetes Care
  const diabetesMedicines = [
    { name: 'Metformin 500mg', activeIngredient: 'Metformin', dosage: '500mg', price: 15.99, originalPrice: 19.99, prescription: true, description: 'First-line diabetes medication' },
    { name: 'Glipizide 5mg', activeIngredient: 'Glipizide', dosage: '5mg', price: 22.99, originalPrice: 27.99, prescription: true, description: 'Sulfonylurea for blood sugar control' },
    { name: 'Insulin Glargine', activeIngredient: 'Insulin Glargine', dosage: '100 units/mL', price: 89.99, originalPrice: 105.99, prescription: true, description: 'Long-acting insulin' },
    { name: 'Sitagliptin 100mg', activeIngredient: 'Sitagliptin', dosage: '100mg', price: 156.99, originalPrice: 182.99, prescription: true, description: 'DPP-4 inhibitor for diabetes' },
    { name: 'Glucose Test Strips', activeIngredient: 'Test Strips', dosage: '50 strips', price: 28.99, originalPrice: 34.99, prescription: false, description: 'Blood glucose monitoring strips' },
    { name: 'Lancets 100ct', activeIngredient: 'Sterile Lancets', dosage: '28G', price: 12.99, originalPrice: 16.99, prescription: false, description: 'Blood glucose testing lancets' },
    { name: 'Empagliflozin 10mg', activeIngredient: 'Empagliflozin', dosage: '10mg', price: 198.99, originalPrice: 229.99, prescription: true, description: 'SGLT2 inhibitor for diabetes' },
    { name: 'Liraglutide Injection', activeIngredient: 'Liraglutide', dosage: '1.8mg/3mL', price: 445.99, originalPrice: 512.99, prescription: true, description: 'GLP-1 receptor agonist' },
    { name: 'Alpha-Lipoic Acid', activeIngredient: 'Alpha-Lipoic Acid', dosage: '300mg', price: 24.99, originalPrice: 29.99, prescription: false, description: 'Diabetic neuropathy support' },
    { name: 'Chromium Supplement', activeIngredient: 'Chromium Picolinate', dosage: '200mcg', price: 16.99, originalPrice: 21.99, prescription: false, description: 'Blood sugar support supplement' }
  ];

  // General Medicine
  const generalMedicines = [
    { name: 'Amoxicillin 500mg', activeIngredient: 'Amoxicillin', dosage: '500mg', price: 18.99, originalPrice: 23.99, prescription: true, description: 'Antibiotic for bacterial infections' },
    { name: 'Dextromethorphan Syrup', activeIngredient: 'Dextromethorphan', dosage: '15mg/5mL', price: 8.99, originalPrice: 12.99, prescription: false, description: 'Cough suppressant syrup' },
    { name: 'Loratadine 10mg', activeIngredient: 'Loratadine', dosage: '10mg', price: 12.99, originalPrice: 16.99, prescription: false, description: 'Non-drowsy antihistamine' },
    { name: 'Omeprazole 20mg', activeIngredient: 'Omeprazole', dosage: '20mg', price: 19.99, originalPrice: 24.99, prescription: false, description: 'Acid reducer for heartburn' },
    { name: 'Loperamide 2mg', activeIngredient: 'Loperamide', dosage: '2mg', price: 7.99, originalPrice: 10.99, prescription: false, description: 'Anti-diarrheal medication' },
    { name: 'Cetirizine 10mg', activeIngredient: 'Cetirizine', dosage: '10mg', price: 11.99, originalPrice: 15.99, prescription: false, description: 'Allergy relief antihistamine' },
    { name: 'Ranitidine 150mg', activeIngredient: 'Ranitidine', dosage: '150mg', price: 14.99, originalPrice: 18.99, prescription: false, description: 'H2 blocker for acid reflux' },
    { name: 'Pseudoephedrine 30mg', activeIngredient: 'Pseudoephedrine', dosage: '30mg', price: 9.99, originalPrice: 13.99, prescription: false, description: 'Nasal decongestant' },
    { name: 'Azithromycin 250mg', activeIngredient: 'Azithromycin', dosage: '250mg', price: 32.99, originalPrice: 38.99, prescription: true, description: 'Antibiotic for respiratory infections' },
    { name: 'Hydrocortisone Cream', activeIngredient: 'Hydrocortisone', dosage: '1%', price: 6.99, originalPrice: 9.99, prescription: false, description: 'Topical anti-inflammatory cream' }
  ];

  // Family Care
  const familyMedicines = [
    { name: 'Children\'s Acetaminophen', activeIngredient: 'Acetaminophen', dosage: '80mg/0.8mL', price: 8.99, originalPrice: 11.99, prescription: false, description: 'Pain and fever relief for children' },
    { name: 'Baby Saline Drops', activeIngredient: 'Sodium Chloride', dosage: '0.65%', price: 5.99, originalPrice: 8.99, prescription: false, description: 'Nasal congestion relief for babies' },
    { name: 'Prenatal Vitamins', activeIngredient: 'Mixed Vitamins', dosage: '1 tablet', price: 24.99, originalPrice: 29.99, prescription: false, description: 'Essential nutrients for pregnancy' },
    { name: 'Diaper Rash Cream', activeIngredient: 'Zinc Oxide', dosage: '40%', price: 7.99, originalPrice: 10.99, prescription: false, description: 'Protection and healing for diaper rash' },
    { name: 'Electrolyte Solution', activeIngredient: 'Electrolytes', dosage: '8 fl oz', price: 4.99, originalPrice: 6.99, prescription: false, description: 'Rehydration for children' },
    { name: 'Gas Relief Drops', activeIngredient: 'Simethicone', dosage: '20mg/0.3mL', price: 9.99, originalPrice: 12.99, prescription: false, description: 'Gas relief for infants' },
    { name: 'Sunscreen SPF 50', activeIngredient: 'Zinc Oxide', dosage: 'SPF 50', price: 12.99, originalPrice: 16.99, prescription: false, description: 'Family sun protection' },
    { name: 'First Aid Antibiotic Ointment', activeIngredient: 'Neomycin/Polymyxin', dosage: '0.5 oz', price: 8.99, originalPrice: 11.99, prescription: false, description: 'Wound care antibiotic ointment' },
    { name: 'Thermometer Digital', activeIngredient: 'Digital Display', dosage: 'N/A', price: 15.99, originalPrice: 19.99, prescription: false, description: 'Accurate temperature measurement' },
    { name: 'Bandages Assorted', activeIngredient: 'Adhesive Bandages', dosage: '100 count', price: 11.99, originalPrice: 14.99, prescription: false, description: 'Assorted wound care bandages' }
  ];

  // Combine all medicine arrays with category assignment
  const allMedicineArrays = [
    { medicines: heartMedicines, categoryIndex: 0 },
    { medicines: painMedicines, categoryIndex: 6 },
    { medicines: wellnessMedicines, categoryIndex: 4 },
    { medicines: brainMedicines, categoryIndex: 1 },
    { medicines: eyeMedicines, categoryIndex: 2 },
    { medicines: diabetesMedicines, categoryIndex: 7 },
    { medicines: generalMedicines, categoryIndex: 5 },
    { medicines: familyMedicines, categoryIndex: 3 }
  ];

  allMedicineArrays.forEach(({ medicines: medicineArray, categoryIndex }) => {
    medicineArray.forEach((med, index) => {
      medicines.push({
        id: uuidv4(),
        name: med.name,
        description: med.description,
        price: med.price,
        originalPrice: med.originalPrice,
        image: `medicine-${categoryIndex}-${index + 1}.jpg`,
        categoryId: categories[categoryIndex].id,
        inStock: Math.random() > 0.1, // 90% chance of being in stock
        stockQuantity: Math.floor(Math.random() * 500) + 10,
        prescription: med.prescription,
        activeIngredient: med.activeIngredient,
        dosage: med.dosage,
        manufacturer: ['Pfizer', 'Johnson & Johnson', 'Novartis', 'Roche', 'Merck', 'GSK', 'Bayer', 'AbbVie'][Math.floor(Math.random() * 8)],
        expiryDate: new Date(Date.now() + (Math.random() * 365 * 2 + 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        batchNumber: `B${Math.floor(Math.random() * 900000) + 100000}`,
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0 rating
        reviewCount: Math.floor(Math.random() * 500) + 10,
        sideEffects: 'Consult your doctor if you experience any unusual symptoms.',
        contraindications: 'Do not use if allergic to any ingredients. Consult doctor before use.',
        isActive: true
      });
    });
  });

  return medicines;
};

const seedDatabase = async () => {
  try {
    await initializeDatabase();
    
    const medicines = generateMedicines();
    
    // Insert categories
    console.log('Seeding categories...');
    const insertCategory = db.prepare(`
      INSERT OR REPLACE INTO categories (id, name, description, image, isActive)
      VALUES (?, ?, ?, ?, ?)
    `);
    
    for (const category of categories) {
      insertCategory.run(category.id, category.name, category.description, category.image, 1);
    }
    insertCategory.finalize();

    // Insert medicines
    console.log('Seeding medicines...');
    const insertMedicine = db.prepare(`
      INSERT OR REPLACE INTO medicines (
        id, name, description, price, originalPrice, image, categoryId,
        inStock, stockQuantity, prescription, activeIngredient, dosage,
        manufacturer, expiryDate, batchNumber, rating, reviewCount,
        sideEffects, contraindications, isActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const medicine of medicines) {
      insertMedicine.run(
        medicine.id, medicine.name, medicine.description, medicine.price,
        medicine.originalPrice, medicine.image, medicine.categoryId,
        medicine.inStock ? 1 : 0, medicine.stockQuantity, medicine.prescription ? 1 : 0,
        medicine.activeIngredient, medicine.dosage, medicine.manufacturer,
        medicine.expiryDate, medicine.batchNumber, medicine.rating, medicine.reviewCount,
        medicine.sideEffects, medicine.contraindications, medicine.isActive ? 1 : 0
      );
    }
    insertMedicine.finalize();

    console.log(`Successfully seeded database with ${categories.length} categories and ${medicines.length} medicines!`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    db.close();
  }
};

// Run the seeding
seedDatabase();