import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Crop,
  Droplet,
  Sprout,
  Bug,
  Globe,
  Gauge,
  Thermometer,
  CloudRain,
  Sun,
  Handshake,
  Loader,
} from 'lucide-react';
import './App.css';


const translations = {
  en: {
    title: 'AI Farming Platform',
    slogan: 'Data-Driven Agriculture for Better Yields',
    dashboard: 'Dashboard',
    dataEntry: 'Data Entry',
    language: 'Language',
    yieldPrediction: 'Yield Prediction',
    recommendations: 'Actionable Recommendations',
    historicalYield: 'Historical Yield',
    predictYield: 'Predict Yield',
    cropType: 'Crop Type',
    region: 'Region',
    selectCrop: 'Select a crop',
    selectRegion: 'Select a region',
    rainfall: 'Rainfall (mm)',
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    soilPh: 'Soil pH',
    soilNitrogen: 'Soil Nitrogen (%)',
    soilMoisture: 'Soil Moisture (%)',
    irrigation: 'Irrigation',
    fertilization: 'Fertilization',
    pestControl: 'Pest Control',
    aiExpert: 'AI Expert',
    loading: 'Generating personalized insights...',
    noData: 'Please enter data to see a prediction.',
    error: 'An error occurred. Please try again later.',
  },
  // ... (hi and ta as in your original code)
  hi: {
    title: 'एआई खेती मंच',
    slogan: 'बेहतर उपज के लिए डेटा-संचालित कृषि',
    dashboard: 'डैशबोर्ड',
    dataEntry: 'डेटा प्रविष्टि',
    language: 'भाषा',
    yieldPrediction: 'उपज भविष्यवाणी',
    recommendations: 'कार्रवाई योग्य सिफारिशें',
    historicalYield: 'ऐतिहासिक उपज',
    predictYield: 'उपज का पूर्वानुमान करें',
    cropType: 'फसल का प्रकार',
    region: 'क्षेत्र',
    selectCrop: 'एक फसल का चयन करें',
    selectRegion: 'एक क्षेत्र का चयन करें',
    rainfall: 'वर्षा (मिमी)',
    temperature: 'तापमान (°C)',
    humidity: 'नमी (%)',
    soilPh: 'मिट्टी का पीएच',
    soilNitrogen: 'मिट्टी में नाइट्रोजन (%)',
    soilMoisture: 'मिट्टी में नमी (%)',
    irrigation: 'सिंचाई',
    fertilization: 'उर्वरक',
    pestControl: 'कीट नियंत्रण',
    aiExpert: 'एआई विशेषज्ञ',
    loading: 'व्यक्तिगत अंतर्दृष्टि उत्पन्न कर रहा है...',
    noData: 'पूर्वानुमान देखने के लिए कृपया डेटा दर्ज करें।',
    error: 'एक त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।',
  },
  ta: {
    title: 'AI விவசாய தளம்',
    slogan: 'சிறந்த விளைச்சலுக்கான தரவு-உந்துதல் விவசாயம்',
    dashboard: 'டாஷ்போர்டு',
    dataEntry: 'தரவு உள்ளீடு',
    language: 'மொழி',
    yieldPrediction: 'விளைச்சல் கணிப்பு',
    recommendations: 'செயல்முறை பரிந்துரைகள்',
    historicalYield: 'வரலாற்று விளைச்சல்',
    predictYield: 'விளைச்சலைக் கணிக்கவும்',
    cropType: 'பயிரின் வகை',
    region: 'பகுதி',
    selectCrop: 'ஒரு பயிரைத் தேர்ந்தெடுக்கவும்',
    selectRegion: 'ஒரு பகுதியைத் தேர்ந்தெடுக்கவும்',
    rainfall: 'மழை (மிமீ)',
    temperature: 'வெப்பநிலை (°C)',
    humidity: 'ஈரப்பதம் (%)',
    soilPh: 'மண்ணின் pH',
    soilNitrogen: 'மண்ணில் நைட்ரஜன் (%)',
    soilMoisture: 'மண்ணின் ஈரப்பதம் (%)',
    irrigation: 'பாசனம்',
    fertilization: 'உரமிடுதல்',
    pestControl: 'பூச்சி கட்டுப்பாடு',
    aiExpert: 'AI நிபுணர்',
    loading: 'தனிப்பயனாக்கப்பட்ட நுண்ணறிவுகளை உருவாக்குகிறேன்...',
    noData: 'கணிப்பைக் காண தரவை உள்ளிடவும்.',
    error: 'ஒரு பிழை ஏற்பட்டது. பின்னர் முயற்சிக்கவும்.',
  },
};



function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    cropType: '',
    region: '',
    rainfall: '',
    temperature: '',
    humidity: '',
    soilPh: '',
    soilNitrogen: '',
    soilMoisture: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [recommendations, setRecommendations] = useState({
    irrigation: null,
    fertilization: null,
    pestControl: null,
  });
   const [summaryRec, setSummaryRec] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const t = translations[language] || translations['en'];

  useEffect(() => {
    const generateHistoricalData = () => {
      const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
      return dates.map((month, index) => ({
        month,
        yield: Math.floor(Math.random() * 2000) + 4000 + (index * 100),
      }));
    };
    setHistoricalData(generateHistoricalData());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePredict = async () => {
    if (!data.cropType || !data.region || !data.rainfall) {
      // Show modal
      const modal = document.createElement('div');
      modal.className = "modal-overlay";
      modal.innerHTML = `
        <div class="modal-content">
          <h3>Input Required</h3>
          <p>${t.noData}</p>
          <button id="closeModal">OK</button>
        </div>
      `;
      document.body.appendChild(modal);
      document.getElementById('closeModal').addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      return;
    }

    setLoading(true);
    const baseYield = 5000;
    const cropFactor = { 'Wheat': 1.2, 'Corn': 1.5, 'Soybeans': 1.1, 'Rice': 1.3 }[data.cropType] || 1;
    const tempFactor = data.temperature > 30 ? 0.9 : 1.1;
    const rainfallFactor = data.rainfall > 50 ? 1.2 : 0.8;
    const soilFactor = data.soilPh > 6.5 ? 1.1 : 0.9;
    const simulatedPrediction = (baseYield * cropFactor * tempFactor * rainfallFactor * soilFactor) + (Math.random() * 500 - 250);
    setPrediction(Math.floor(simulatedPrediction));

    await getRecommendation(data, simulatedPrediction);
    setLoading(false);setCurrentPage('dashboard');

  };

  const getRecommendation = async (inputData, predictedYield) => {
    try {
      // Connect to the new FastAPI backend API
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop_type: data.cropType,
          region: data.region,
          rainfall: parseFloat(data.rainfall),
          temperature: parseFloat(data.temperature),
          humidity: parseFloat(data.humidity),
          soilPh: parseFloat(data.soilPh),
          soilNitrogen: parseFloat(data.soilNitrogen),
          soilMoisture: parseFloat(data.soilMoisture),
          cropGrowthStage: data.cropGrowthStage,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed with status ' + response.status);
      }

       const result = await response.json();
      setPrediction(Math.floor(result.predicted_yield));
      setRecommendations({
        irrigation: result.irrigation_rec,
        fertilization: result.fertilizer_rec,
        pestControl: result.pest_control_rec,
      });
       setSummaryRec(result.summary_rec);
    } catch (error) {
      console.error('Prediction failed:', error);
      setRecommendations({
        irrigation: t.error,
        fertilization: t.error,
        pestControl: t.error,
      });
       setSummaryRec(t.error);
    } finally {
      setLoading(false);
    }
  };

  const RecommendationCard = ({ icon, title, description, color }) => (
    <div className={`rec-card border-${color}`}>
      <div className={`rec-title text-${color}`}>
        {icon}
        <h4>{title}</h4>
      </div>
      <p>{description || "No recommendation available."}</p>
    </div>
  );

  const dashboardContent = (
    <div className="dashboard">
      <div className="card">
        <div className="card-title">
          <Gauge className="icon-indigo" size={24} />
          <h2>{t.yieldPrediction}</h2>
        </div>
        <div className="yield-pred">
          {prediction !== null ? (
            <div className="yield-value">{prediction} <span>kg/hectare</span></div>
          ) : (
            <p className="muted">{t.noData}</p>
          )}
        </div>
        <div className="chart-wrap">
          <div className="chart-title">
            <Sprout className="icon-indigo" size={20} />
            <h3>{t.historicalYield}</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="yield" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card">
        <div className="card-title">
          <Handshake className="icon-green" size={24} />
          <h2>{t.recommendations}</h2>
        </div>
        {loading ? (
          <div className="loading">
            <Loader size={32} className="icon-spin" />
            <p>{t.loading}</p>
          </div>
        ) : (
          <div>
             {summaryRec && (
              <div className="ai-recommend">
                <span className="ai-label">{t.aiExpert}:</span>
                <p>{summaryRec}</p>
              </div>
            )}
            <div className="rec-grid">
              <RecommendationCard
                icon={<Droplet size={20} />}
                title={t.irrigation}
                description={recommendations.irrigation || "No recommendation available."}
                color="blue"
              />
              <RecommendationCard
                icon={<Sprout size={20} />}
                title={t.fertilization}
                description={recommendations.fertilization || "No recommendation available."}
                color="green"
              />
              <RecommendationCard
                icon={<Bug size={20} />}
                title={t.pestControl}
                description={recommendations.pestControl || "No recommendation available."}
                color="red"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const dataEntryContent = (
    <div className="card">
      <div className="card-title">
        <Crop className="icon-indigo" size={24} />
        <h2>{t.dataEntry}</h2>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }} className="form-grid">
        <div className="form-section">
          <h3>General Info</h3>
        </div>
        <div>
          <label htmlFor="cropType">{t.cropType}</label>
          <select
            name="cropType"
            id="cropType"
            value={data.cropType}
            onChange={handleInputChange}
          >
            <option value="">{t.selectCrop}</option>
            <option value="Corn">Corn</option>
            <option value="Wheat">Wheat</option>
            <option value="Soybeans">Soybeans</option>
            <option value="Rice">Rice</option>
          </select>
        </div>
        <div>
          <label htmlFor="region">{t.region}</label>
          <select
            name="region"
            id="region"
            value={data.region}
            onChange={handleInputChange}
          >
            <option value="">{t.selectRegion}</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>

        <div >
        <label htmlFor="cropGrowthStage">Crop Growth Stage</label>
        <select
          name="cropGrowthStage"
          id="cropGrowthStage"
          value={data.cropGrowthStage}
          onChange={handleInputChange}
        >
          <option value="">Select stage</option>
          <option value="Planting">Planting</option>
          <option value="Vegetative">Vegetative</option>
          <option value="Flowering">Flowering</option>
          <option value="Harvest">Harvest</option>
        </select>
      </div>
        <div className="form-section">
          <h3>Weather & Soil Metrics</h3>
        </div>
        {[
          { label: t.rainfall, name: 'rainfall', type: 'number', icon: CloudRain },
          { label: t.temperature, name: 'temperature', type: 'number', icon: Thermometer },
          { label: t.humidity, name: 'humidity', type: 'number', icon: Droplet },
          { label: t.soilPh, name: 'soilPh', type: 'number', icon: Gauge, step: '0.1' },
          { label: t.soilNitrogen, name: 'soilNitrogen', type: 'number', icon: Sprout },
          { label: t.soilMoisture, name: 'soilMoisture', type: 'number', icon: Droplet },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <div className="input-icon">
              <field.icon size={18} />
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={data[field.name]}
                onChange={handleInputChange}
                step={field.step}
               placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </div>
          </div>
        ))}
        <div className="form-footer">
          <button type="submit" disabled={loading}>
            {loading ? <Loader className="icon-spin" size={20} /> : null}
            {t.predictYield}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="main-bg">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <Sun className="icon-yellow" size={32} />
            <h1>{t.title}</h1>
          </div>
          <div className="lang-select">
            <Globe size={24} />
            <select
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
        <div className="tabs">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={currentPage === 'dashboard' ? 'tab-active' : ''}
          >
            {t.dashboard}
          </button>
          <button
            onClick={() => setCurrentPage('dataEntry')}
            className={currentPage === 'dataEntry' ? 'tab-active' : ''}
          >
            {t.dataEntry}
          </button>
        </div>
        {currentPage === 'dashboard' ? dashboardContent : dataEntryContent}
      </div>
    </div>
  );
}

export default App;
