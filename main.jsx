import React, { useState } from 'react';
import { MapPin, Satellite, Droplets, Sun, Sprout, TrendingUp, Award } from 'lucide-react';

const AgroSpaceQuiz = () => {
  const [gameState, setGameState] = useState('language');
  const [language, setLanguage] = useState('pt');
  const [location, setLocation] = useState({ lat: '', lon: '', radius: 5 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questions, setQuestions] = useState([]);

  const translations = {
    pt: { title: 'AgroSpace Quiz', subtitle: 'Agricultura sustentável com NASA', startGame: 'Começar', selectLanguage: 'Trocar idioma', precipitation: 'Precipitação', vegetation: 'Vegetação', temperature: 'Temperatura', defineLocation: 'Sua Localização', latitude: 'Latitude', longitude: 'Longitude', radiusAnalysis: 'Raio', useMyLocation: 'Usar localização', startQuiz: 'Iniciar', back: 'Voltar', loading: 'Carregando...', downloadingData: 'Baixando dados', points: 'Pontos', question: 'Pergunta', of: 'de', yourRegion: 'Sua Região', congratulations: 'Parabéns!', keepLearning: 'Continue!', playAgain: 'Jogar Novamente', next: 'Próxima', seeResult: 'Ver Resultado' },
    en: { title: 'AgroSpace Quiz', subtitle: 'Sustainable agriculture with NASA', startGame: 'Start', selectLanguage: 'Change language', precipitation: 'Precipitation', vegetation: 'Vegetation', temperature: 'Temperature', defineLocation: 'Your Location', latitude: 'Latitude', longitude: 'Longitude', radiusAnalysis: 'Radius', useMyLocation: 'Use location', startQuiz: 'Start', back: 'Back', loading: 'Loading...', downloadingData: 'Downloading data', points: 'Points', question: 'Question', of: 'of', yourRegion: 'Your Region', congratulations: 'Congratulations!', keepLearning: 'Keep Learning!', playAgain: 'Play Again', next: 'Next', seeResult: 'See Result' },
    es: { title: 'AgroSpace Quiz', subtitle: 'Agricultura sostenible con NASA', startGame: 'Comenzar', selectLanguage: 'Cambiar idioma', precipitation: 'Precipitación', vegetation: 'Vegetación', temperature: 'Temperatura', defineLocation: 'Tu Ubicación', latitude: 'Latitud', longitude: 'Longitud', radiusAnalysis: 'Radio', useMyLocation: 'Usar ubicación', startQuiz: 'Iniciar', back: 'Volver', loading: 'Cargando...', downloadingData: 'Descargando datos', points: 'Puntos', question: 'Pregunta', of: 'de', yourRegion: 'Tu Región', congratulations: '¡Felicitaciones!', keepLearning: '¡Sigue!', playAgain: 'Jugar de Nuevo', next: 'Siguiente', seeResult: 'Ver Resultado' }
  };

  const t = translations[language];

  const questionsDB = {
    pt: [
      { id: 1, question: 'Precipitação anual: 1200mm. Mês passado: 45mm. Melhor decisão?', icon: '🌧️', options: ['Aumentar irrigação agora', 'Monitorar 15 dias e ajustar', 'Não fazer nada', 'Plantar alto consumo'], correct: 1, explanation: { correct: '✅ Correto! Monitorar permite entender se é sazonal.', wrong: '❌ Use dados históricos para decisões.' }, dataSource: 'NASA POWER' },
      { id: 2, question: 'NDVI: 0.65 (>0.6 = saudável). O que fazer?', icon: '🌱', options: ['Está saudável, manter', 'Aplicar fertilizantes', 'Risco de desertificação', 'Reduzir irrigação'], correct: 0, explanation: { correct: '✅ NDVI 0.6-0.9 = vegetação saudável.', wrong: '❌ 0.65 é saudável!' }, dataSource: 'NASA MODIS' },
      { id: 3, question: '5 anos: 1150, 1300, 980, 1400, 1200mm. Planejar?', icon: '📊', options: ['Ignorar passado', 'Usar média histórica', 'Só alto consumo', 'Esperar'], correct: 1, explanation: { correct: '✅ Média mostra tendências.', wrong: '❌ Dados históricos são importantes.' }, dataSource: 'NASA POWER' },
      { id: 4, question: 'Umidade: 35%. Temp: 32°C. Ação?', icon: '🌡️', options: ['Irrigar o dia todo', 'Irrigar manhã/tarde', 'Esperar chuva', 'Só à noite'], correct: 1, explanation: { correct: '✅ Horários frescos evitam evaporação.', wrong: '❌ Calor perde 40-60% de água.' }, dataSource: 'NASA SMAP' },
      { id: 5, question: 'Frente fria: 80mm em 3 dias. Ação?', icon: '⛈️', options: ['Irrigar normal', 'Suspender e checar drenagem', 'Aplicar fertilizante', 'Colher tudo'], correct: 1, explanation: { correct: '✅ Evita encharcamento.', wrong: '❌ 80mm + irrigação = problema.' }, dataSource: 'NASA EONET' }
    ],
    en: [
      { id: 1, question: 'Annual: 1200mm. Last month: 45mm. Best?', icon: '🌧️', options: ['Increase now', 'Monitor 15 days', 'Do nothing', 'High water crops'], correct: 1, explanation: { correct: '✅ Monitoring shows if seasonal.', wrong: '❌ Use historical data.' }, dataSource: 'NASA POWER' },
      { id: 2, question: 'NDVI: 0.65 (>0.6 = healthy). Action?', icon: '🌱', options: ['Healthy, maintain', 'Add fertilizers', 'Desertification risk', 'Reduce water'], correct: 0, explanation: { correct: '✅ NDVI 0.6-0.9 = healthy.', wrong: '❌ 0.65 is healthy!' }, dataSource: 'NASA MODIS' },
      { id: 3, question: '5 years: 1150, 1300, 980, 1400, 1200mm. Plan?', icon: '📊', options: ['Ignore past', 'Use average', 'Only high water', 'Wait'], correct: 1, explanation: { correct: '✅ Average shows trends.', wrong: '❌ Historical data matters.' }, dataSource: 'NASA POWER' },
      { id: 4, question: 'Moisture: 35%. Temp: 32°C. Action?', icon: '🌡️', options: ['Heavy all day', 'Light morning/afternoon', 'Wait rain', 'Only night'], correct: 1, explanation: { correct: '✅ Cool hours reduce evaporation.', wrong: '❌ Heat loses 40-60% water.' }, dataSource: 'NASA SMAP' },
      { id: 5, question: 'Cold front: 80mm in 3 days. Action?', icon: '⛈️', options: ['Irrigate normal', 'Suspend, check drainage', 'Add fertilizer', 'Harvest all'], correct: 1, explanation: { correct: '✅ Prevents waterlogging.', wrong: '❌ 80mm + irrigation = problem.' }, dataSource: 'NASA EONET' }
    ],
    es: [
      { id: 1, question: 'Anual: 1200mm. Mes: 45mm. ¿Mejor?', icon: '🌧️', options: ['Aumentar ahora', 'Monitorear 15 días', 'No hacer nada', 'Alto consumo'], correct: 1, explanation: { correct: '✅ Monitorear muestra si es estacional.', wrong: '❌ Usa datos históricos.' }, dataSource: 'NASA POWER' },
      { id: 2, question: 'NDVI: 0.65 (>0.6 = saludable). ¿Acción?', icon: '🌱', options: ['Saludable, mantener', 'Fertilizantes', 'Riesgo desertificación', 'Reducir agua'], correct: 0, explanation: { correct: '✅ NDVI 0.6-0.9 = saludable.', wrong: '❌ ¡0.65 es saludable!' }, dataSource: 'NASA MODIS' },
      { id: 3, question: '5 años: 1150, 1300, 980, 1400, 1200mm. ¿Plan?', icon: '📊', options: ['Ignorar pasado', 'Usar promedio', 'Solo alto consumo', 'Esperar'], correct: 1, explanation: { correct: '✅ Promedio muestra tendencias.', wrong: '❌ Datos históricos importan.' }, dataSource: 'NASA POWER' },
      { id: 4, question: 'Humedad: 35%. Temp: 32°C. ¿Acción?', icon: '🌡️', options: ['Riego pesado día', 'Riego ligero mañana/tarde', 'Esperar lluvia', 'Solo noche'], correct: 1, explanation: { correct: '✅ Horas frescas reducen evaporación.', wrong: '❌ Calor pierde 40-60% agua.' }, dataSource: 'NASA SMAP' },
      { id: 5, question: 'Frente frío: 80mm en 3 días. ¿Acción?', icon: '⛈️', options: ['Regar normal', 'Suspender, checar drenaje', 'Fertilizante', 'Cosechar todo'], correct: 1, explanation: { correct: '✅ Previene encharcamiento.', wrong: '❌ 80mm + riego = problema.' }, dataSource: 'NASA EONET' }
    ]
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setGameState('menu');
  };

  const startQuiz = () => {
    if (!location.lat || !location.lon) return;
    setGameState('loading');
    
    // Busca dados reais da NASA POWER API
    fetchNASAPowerData();
  };

  const fetchNASAPowerData = async () => {
    try {
      const lat = parseFloat(location.lat);
      const lon = parseFloat(location.lon);
      
      // Data de hoje e 1 ano atrás
      const endDate = new Date();
      const startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 5); // 5 anos de dados históricos
      
      const startDateStr = startDate.toISOString().split('T')[0].replace(/-/g, '');
      const endDateStr = endDate.toISOString().split('T')[0].replace(/-/g, '');
      
      // URL da API NASA POWER
      const apiUrl = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,T2M,T2M_MAX,T2M_MIN&community=AG&longitude=${lon}&latitude=${lat}&start=${startDateStr}&end=${endDateStr}&format=JSON`;
      
      console.log('🛰️ Buscando dados NASA POWER:', apiUrl);
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      console.log('✅ Dados recebidos:', data);
      
      // Processa os dados recebidos
      const rainfall = data.properties.parameter.PRECTOTCORR;
      const temperature = data.properties.parameter.T2M;
      const tempMax = data.properties.parameter.T2M_MAX;
      
      // Calcula estatísticas
      const rainfallValues = Object.values(rainfall).filter(v => v >= 0);
      const tempValues = Object.values(temperature).filter(v => v > -999);
      const tempMaxValues = Object.values(tempMax).filter(v => v > -999);
      
      // Precipitação anual média (soma dos últimos 365 dias)
      const last365Days = rainfallValues.slice(-365);
      const annualRainfall = last365Days.reduce((a, b) => a + b, 0);
      
      // Precipitação do último mês (últimos 30 dias)
      const last30Days = rainfallValues.slice(-30);
      const monthlyRainfall = last30Days.reduce((a, b) => a + b, 0);
      
      // Temperatura média
      const avgTemp = tempValues.reduce((a, b) => a + b, 0) / tempValues.length;
      const maxTemp = Math.max(...tempMaxValues.slice(-30));
      
      // Precipitação dos últimos 5 anos (anual)
      const rainfall5Years = [];
      for (let i = 0; i < 5; i++) {
        const yearData = rainfallValues.slice(-(365 * (i + 1)), rainfallValues.length - (365 * i));
        const yearSum = yearData.reduce((a, b) => a + b, 0);
        rainfall5Years.unshift(Math.round(yearSum));
      }
      
      // Simula NDVI baseado na precipitação (quanto mais chuva, maior NDVI)
      const ndvi = Math.min(0.9, Math.max(0.2, (monthlyRainfall / annualRainfall) * 12 * 0.7));
      
      // Umidade do solo estimada (baseada na precipitação recente)
      const soilMoisture = Math.min(100, Math.max(10, (monthlyRainfall / 100) * 100));
      
      // Gera perguntas dinâmicas com dados reais
      const dynamicQuestions = generateDynamicQuestions({
        annualRainfall: Math.round(annualRainfall),
        monthlyRainfall: Math.round(monthlyRainfall),
        avgTemp: Math.round(avgTemp),
        maxTemp: Math.round(maxTemp),
        ndvi: ndvi.toFixed(2),
        soilMoisture: Math.round(soilMoisture),
        rainfall5Years: rainfall5Years,
        location: { lat, lon }
      });
      
      setQuestions(dynamicQuestions);
      setGameState('quiz');
      
    } catch (error) {
      console.error('❌ Erro ao buscar dados NASA:', error);
      // Fallback: usa perguntas padrão
      setQuestions(questionsDB[language]);
      setGameState('quiz');
    }
  };

  const generateDynamicQuestions = (realData) => {
    const questionsTemplates = {
      pt: [
        {
          id: 1,
          question: `Sua fazenda está em uma região com precipitação anual de ${realData.annualRainfall}mm. O mês passado choveu ${realData.monthlyRainfall}mm. Qual a melhor decisão?`,
          icon: '🌧️',
          options: [
            'Aumentar irrigação imediatamente',
            'Monitorar mais 15 dias e ajustar gradualmente',
            'Não fazer nada, é normal variação sazonal',
            'Plantar culturas que consomem mais água'
          ],
          correct: realData.monthlyRainfall < (realData.annualRainfall / 12) * 0.5 ? 1 : 2,
          explanation: {
            correct: `✅ Correto! Com ${realData.monthlyRainfall}mm no último mês vs média de ${Math.round(realData.annualRainfall/12)}mm/mês, ${realData.monthlyRainfall < (realData.annualRainfall / 12) * 0.5 ? 'monitorar é prudente' : 'está dentro do normal'}.`,
            wrong: `❌ Analise: Precipitação anual ${realData.annualRainfall}mm ÷ 12 = ${Math.round(realData.annualRainfall/12)}mm/mês esperado. Mês atual: ${realData.monthlyRainfall}mm. ${realData.monthlyRainfall < (realData.annualRainfall / 12) * 0.5 ? 'Abaixo da média!' : 'Normal!'}`
          },
          dataSource: `NASA POWER - Lat: ${realData.location.lat.toFixed(2)}°, Lon: ${realData.location.lon.toFixed(2)}°`
        },
        {
          id: 2,
          question: `O NDVI estimado da sua área é ${realData.ndvi}. Valores acima de 0.6 indicam vegetação saudável. O que fazer?`,
          icon: '🌱',
          options: [
            'Está saudável, manter práticas',
            'Aplicar fertilizantes urgente',
            'Risco de desertificação',
            'Reduzir irrigação'
          ],
          correct: parseFloat(realData.ndvi) >= 0.6 ? 0 : 1,
          explanation: {
            correct: `✅ NDVI ${realData.ndvi} ${parseFloat(realData.ndvi) >= 0.6 ? 'indica vegetação saudável!' : 'indica necessidade de atenção.'}`,
            wrong: `❌ NDVI ${realData.ndvi}: ${parseFloat(realData.ndvi) >= 0.6 ? 'Saudável (>0.6)!' : 'Precisa melhorar (<0.6)'} Escala: 0-0.2=solo, 0.2-0.5=esparso, 0.6-0.9=denso.`
          },
          dataSource: `Estimativa baseada em dados NASA`
        },
        {
          id: 3,
          question: `Últimos 5 anos de precipitação: ${realData.rainfall5Years.join('mm, ')}mm. Como planejar?`,
          icon: '📊',
          options: [
            'Ignorar dados passados',
            'Usar média histórica para planejar',
            'Só alto consumo de água',
            'Esperar'
          ],
          correct: 1,
          explanation: {
            correct: `✅ Média histórica: ${Math.round(realData.rainfall5Years.reduce((a,b) => a+b, 0)/5)}mm/ano. Variação de ${Math.min(...realData.rainfall5Years)} a ${Math.max(...realData.rainfall5Years)}mm mostra necessidade de planejamento!`,
            wrong: `❌ Dados históricos são essenciais! Média: ${Math.round(realData.rainfall5Years.reduce((a,b) => a+b, 0)/5)}mm/ano. Variação indica necessidade de sistema flexível.`
          },
          dataSource: `NASA POWER - Histórico Real`
        },
        {
          id: 4,
          question: `Umidade do solo estimada: ${realData.soilMoisture}%. Temperatura máxima: ${realData.maxTemp}°C. Ação?`,
          icon: '🌡️',
          options: [
            'Irrigação pesada o dia todo',
            'Irrigação leve manhã/tarde',
            'Esperar chuva',
            'Só à noite'
          ],
          correct: realData.soilMoisture < 40 ? 1 : 2,
          explanation: {
            correct: `✅ Com umidade ${realData.soilMoisture}% e ${realData.maxTemp}°C, ${realData.soilMoisture < 40 ? 'irrigação leve em horários frescos é ideal' : 'pode aguardar'}.`,
            wrong: `❌ Umidade ${realData.soilMoisture}% com ${realData.maxTemp}°C: ${realData.soilMoisture < 40 ? 'Precisa irrigar!' : 'Está adequado!'} Irrigar no calor perde 40-60% por evaporação.`
          },
          dataSource: `NASA SMAP/POWER - Dados Reais`
        },
        {
          id: 5,
          question: `Baseado nos padrões climáticos da sua região (${realData.annualRainfall}mm/ano), qual cultura é mais adequada?`,
          icon: '🌾',
          options: [
            'Arroz (requer 1500-2000mm)',
            'Milho (requer 500-800mm)',
            'Trigo (requer 450-650mm)',
            'Decidir pelo preço de mercado apenas'
          ],
          correct: realData.annualRainfall > 1500 ? 0 : (realData.annualRainfall > 800 ? 1 : 2),
          explanation: {
            correct: `✅ Com ${realData.annualRainfall}mm/ano, ${realData.annualRainfall > 1500 ? 'arroz é viável' : realData.annualRainfall > 800 ? 'milho é ideal' : 'trigo é adequado'}!`,
            wrong: `❌ Sua região tem ${realData.annualRainfall}mm/ano. ${realData.annualRainfall > 1500 ? 'Suficiente para arroz!' : realData.annualRainfall > 800 ? 'Ideal para milho!' : 'Trigo é mais adequado!'}`
          },
          dataSource: `NASA POWER - Análise Climática`
        }
      ],
      en: [
        {
          id: 1,
          question: `Your farm: annual ${realData.annualRainfall}mm. Last month: ${realData.monthlyRainfall}mm. Best decision?`,
          icon: '🌧️',
          options: [
            'Increase irrigation now',
            'Monitor 15 days, adjust gradually',
            'Do nothing, normal variation',
            'Plant high water crops'
          ],
          correct: realData.monthlyRainfall < (realData.annualRainfall / 12) * 0.5 ? 1 : 2,
          explanation: {
            correct: `✅ Correct! ${realData.monthlyRainfall}mm vs avg ${Math.round(realData.annualRainfall/12)}mm/month. ${realData.monthlyRainfall < (realData.annualRainfall / 12) * 0.5 ? 'Monitor needed' : 'Within normal'}.`,
            wrong: `❌ Analysis: Annual ${realData.annualRainfall}mm ÷ 12 = ${Math.round(realData.annualRainfall/12)}mm/month. Current: ${realData.monthlyRainfall}mm.`
          },
          dataSource: `NASA POWER - Real Data`
        },
        {
          id: 2,
          question: `Estimated NDVI: ${realData.ndvi}. Values >0.6 = healthy. Action?`,
          icon: '🌱',
          options: ['Healthy, maintain', 'Add fertilizers', 'Desertification risk', 'Reduce water'],
          correct: parseFloat(realData.ndvi) >= 0.6 ? 0 : 1,
          explanation: {
            correct: `✅ NDVI ${realData.ndvi} ${parseFloat(realData.ndvi) >= 0.6 ? 'is healthy!' : 'needs attention.'}`,
            wrong: `❌ NDVI ${realData.ndvi}: ${parseFloat(realData.ndvi) >= 0.6 ? 'Healthy!' : 'Needs improvement'}`
          },
          dataSource: `NASA Estimation`
        },
        {
          id: 3,
          question: `5-year rainfall: ${realData.rainfall5Years.join(', ')}mm. Plan?`,
          icon: '📊',
          options: ['Ignore past', 'Use historical average', 'Only high water', 'Wait'],
          correct: 1,
          explanation: {
            correct: `✅ Average: ${Math.round(realData.rainfall5Years.reduce((a,b) => a+b, 0)/5)}mm/year. Range ${Math.min(...realData.rainfall5Years)}-${Math.max(...realData.rainfall5Years)}mm needs planning!`,
            wrong: `❌ Historical data essential! Average: ${Math.round(realData.rainfall5Years.reduce((a,b) => a+b, 0)/5)}mm/year.`
          },
          dataSource: `NASA POWER - Real History`
        },
        {
          id: 4,
          question: `Soil moisture: ${realData.soilMoisture}%. Max temp: ${realData.maxTemp}°C. Action?`,
          icon: '🌡️',
          options: ['Heavy all day', 'Light morning/afternoon', 'Wait rain', 'Only night'],
          correct: realData.soilMoisture < 40 ? 1 : 2,
          explanation: {
            correct: `✅ ${realData.soilMoisture}% moisture, ${realData.maxTemp}°C: ${realData.soilMoisture < 40 ? 'light irrigation ideal' : 'can wait'}.`,
            wrong: `❌ ${realData.soilMoisture}% with ${realData.maxTemp}°C: ${realData.soilMoisture < 40 ? 'Needs water!' : 'Adequate!'}`
          },
          dataSource: `NASA SMAP/POWER`
        },
        {
          id: 5,
          question: `Climate patterns (${realData.annualRainfall}mm/year). Best crop?`,
          icon: '🌾',
          options: ['Rice (1500-2000mm)', 'Corn (500-800mm)', 'Wheat (450-650mm)', 'Market price only'],
          correct: realData.annualRainfall > 1500 ? 0 : (realData.annualRainfall > 800 ? 1 : 2),
          explanation: {
            correct: `✅ ${realData.annualRainfall}mm/year: ${realData.annualRainfall > 1500 ? 'rice viable' : realData.annualRainfall > 800 ? 'corn ideal' : 'wheat suitable'}!`,
            wrong: `❌ Your region: ${realData.annualRainfall}mm/year. ${realData.annualRainfall > 1500 ? 'Rice ok!' : realData.annualRainfall > 800 ? 'Corn ideal!' : 'Wheat better!'}`
          },
          dataSource: `NASA POWER Analysis`
        }
      ],
      es: [
        {
          id: 1,
          question: `Tu granja: anual ${realData.annualRainfall}mm. Mes: ${realData.monthlyRainfall}mm. ¿Decisión?`,
          icon: '🌧️',
          options: ['Aumentar ahora', 'Monitorear 15 días', 'No hacer nada', 'Alto consumo'],
          correct: realData.monthlyRainfall < (realData.annualRainfall / 12) * 0.5 ? 1 : 2,
          explanation: {
            correct: `✅ ¡Correcto! ${realData.monthlyRainfall}mm vs ${Math.round(realData.annualRainfall/12)}mm/mes promedio.`,
            wrong: `❌ Anual ${realData.annualRainfall}mm ÷ 12 = ${Math.round(realData.annualRainfall/12)}mm/mes. Actual: ${realData.monthlyRainfall}mm.`
          },
          dataSource: `NASA POWER - Datos Reales`
        },
        {
          id: 2,
          question: `NDVI estimado: ${realData.ndvi}. >0.6 = saludable. ¿Acción?`,
          icon: '🌱',
          options: ['Saludable, mantener', 'Fertilizantes', 'Riesgo', 'Reducir agua'],
          correct: parseFloat(realData.ndvi) >= 0.6 ? 0 : 1,
          explanation: {
            correct: `✅ NDVI ${realData.ndvi} ${parseFloat(realData.ndvi) >= 0.6 ? '¡es saludable!' : 'necesita atención.'}`,
            wrong: `❌ NDVI ${realData.ndvi}: ${parseFloat(realData.ndvi) >= 0.6 ? '¡Saludable!' : '¡Mejorar!'}`
          },
          dataSource: `Estimación NASA`
        },
        {
          id: 3,
          question: `5 años lluvia: ${realData.rainfall5Years.join(', ')}mm. ¿Plan?`,
          icon: '📊',
          options: ['Ignorar pasado', 'Usar promedio', 'Solo alto consumo', 'Esperar'],
          correct: 1,
          explanation: {
            correct: `✅ Promedio: ${Math.round(realData.rainfall5Years.reduce((a,b) => a+b, 0)/5)}mm/año. Rango ${Math.min(...realData.rainfall5Years)}-${Math.max(...realData.rainfall5Years)}mm.`,
            wrong: `❌ Datos históricos esenciales! Promedio: ${Math.round(realData.rainfall5Years.reduce((a,b) => a+b, 0)/5)}mm/año.`
          },
          dataSource: `NASA POWER - Histórico`
        },
        {
          id: 4,
          question: `Humedad: ${realData.soilMoisture}%. Temp máx: ${realData.maxTemp}°C. ¿Acción?`,
          icon: '🌡️',
          options: ['Pesado todo día', 'Ligero mañana/tarde', 'Esperar', 'Solo noche'],
          correct: realData.soilMoisture < 40 ? 1 : 2,
          explanation: {
            correct: `✅ ${realData.soilMoisture}% humedad, ${realData.maxTemp}°C: ${realData.soilMoisture < 40 ? 'riego ligero ideal' : 'puede esperar'}.`,
            wrong: `❌ ${realData.soilMoisture}% con ${realData.maxTemp}°C: ${realData.soilMoisture < 40 ? '¡Necesita agua!' : '¡Adecuado!'}`
          },
          dataSource: `NASA SMAP/POWER`
        },
        {
          id: 5,
          question: `Clima (${realData.annualRainfall}mm/año). ¿Mejor cultivo?`,
          icon: '🌾',
          options: ['Arroz (1500-2000mm)', 'Maíz (500-800mm)', 'Trigo (450-650mm)', 'Solo precio'],
          correct: realData.annualRainfall > 1500 ? 0 : (realData.annualRainfall > 800 ? 1 : 2),
          explanation: {
            correct: `✅ ${realData.annualRainfall}mm/año: ${realData.annualRainfall > 1500 ? 'arroz viable' : realData.annualRainfall > 800 ? 'maíz ideal' : 'trigo adecuado'}!`,
            wrong: `❌ Tu región: ${realData.annualRainfall}mm/año. ${realData.annualRainfall > 1500 ? '¡Arroz ok!' : realData.annualRainfall > 800 ? '¡Maíz ideal!' : '¡Trigo mejor!'}`
          },
          dataSource: `NASA POWER Análisis`
        }
      ]
    };

    return questionsTemplates[language];
  };

  const handleAnswer = (idx) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === questions[currentQuestion].correct) {
      setScore(score + 20);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setGameState('result');
    }
  };

  if (gameState === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Satellite className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">🌍 AgroSpace Quiz</h1>
            <p className="text-gray-600">Select / Selecione / Selecciona</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button onClick={() => handleLanguageSelect('pt')} className="bg-green-50 hover:bg-green-100 p-6 rounded-2xl border-2 border-green-300 hover:border-green-500 transition-all">
              <div className="text-5xl mb-2">🇧🇷</div>
              <h3 className="text-lg font-bold text-green-800">Português</h3>
            </button>
            <button onClick={() => handleLanguageSelect('en')} className="bg-blue-50 hover:bg-blue-100 p-6 rounded-2xl border-2 border-blue-300 hover:border-blue-500 transition-all">
              <div className="text-5xl mb-2">🇺🇸</div>
              <h3 className="text-lg font-bold text-blue-800">English</h3>
            </button>
            <button onClick={() => handleLanguageSelect('es')} className="bg-red-50 hover:bg-red-100 p-6 rounded-2xl border-2 border-red-300 hover:border-red-500 transition-all">
              <div className="text-5xl mb-2">🇪🇸</div>
              <h3 className="text-lg font-bold text-red-800">Español</h3>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <Satellite className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8 text-center">{t.subtitle}</p>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-700">{t.precipitation}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <Sprout className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-700">{t.vegetation}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <Sun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-700">{t.temperature}</p>
            </div>
          </div>
          <button onClick={() => setGameState('location')} className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-green-700 hover:to-blue-700 mb-3">
            🚀 {t.startGame}
          </button>
          <button onClick={() => setGameState('language')} className="w-full text-gray-600 hover:text-gray-800 text-sm">
            🌐 {t.selectLanguage}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'location') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📍 {t.defineLocation}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mapa Interativo */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">🗺️ {language === 'pt' ? 'Clique no mapa' : language === 'en' ? 'Click on map' : 'Clic en el mapa'}</h3>
              <div 
                className="relative w-full h-96 rounded-xl overflow-hidden border-4 border-green-500 bg-gradient-to-br from-blue-100 to-green-100 cursor-crosshair"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  // Converte coordenadas do clique para lat/lon
                  // Simula um mapa mundial simplificado
                  const lon = ((x / rect.width) * 360) - 180;
                  const lat = 90 - ((y / rect.height) * 180);
                  
                  setLocation({
                    lat: lat.toFixed(6),
                    lon: lon.toFixed(6),
                    radius: location.radius
                  });
                }}
              >
                {/* Fundo do mapa estilo satélite */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-green-400 to-green-600 opacity-60"></div>
                
                {/* Grid de latitude/longitude */}
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  <defs>
                    <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />
                </svg>
                
                {/* Continentes simplificados */}
                <div className="absolute top-1/4 left-1/3 w-32 h-24 bg-green-700 rounded-full opacity-40 blur-xl"></div>
                <div className="absolute top-1/3 left-1/2 w-40 h-32 bg-green-800 rounded-lg opacity-40 blur-xl"></div>
                <div className="absolute top-1/2 right-1/4 w-28 h-36 bg-green-700 opacity-40 blur-xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-36 h-24 bg-green-800 rounded-full opacity-40 blur-xl"></div>
                
                {/* Marcador de localização selecionada */}
                {location.lat && location.lon && (
                  <div 
                    className="absolute transform -translate-x-1/2 -translate-y-full"
                    style={{
                      left: `${((parseFloat(location.lon) + 180) / 360) * 100}%`,
                      top: `${((90 - parseFloat(location.lat)) / 180) * 100}%`
                    }}
                  >
                    <div className="relative">
                      <MapPin className="w-8 h-8 text-red-600 drop-shadow-2xl animate-bounce" fill="#dc2626" />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>
                )}
                
                {/* Instruções */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                  <p className="text-white text-sm font-semibold text-center">
                    {language === 'pt' ? '👆 Clique em qualquer lugar do mapa' : 
                     language === 'en' ? '👆 Click anywhere on the map' : 
                     '👆 Clic en cualquier lugar del mapa'}
                  </p>
                </div>
                
                {/* Coordenadas atuais */}
                {location.lat && location.lon && (
                  <div className="absolute top-4 left-4 bg-green-600 bg-opacity-90 px-4 py-2 rounded-lg">
                    <p className="text-white text-xs font-bold">
                      📍 Lat: {parseFloat(location.lat).toFixed(2)}°
                    </p>
                    <p className="text-white text-xs font-bold">
                      📍 Lon: {parseFloat(location.lon).toFixed(2)}°
                    </p>
                  </div>
                )}
                
                {/* Legendas dos continentes */}
                <div className="absolute top-4 right-4 bg-blue-600 bg-opacity-90 px-3 py-2 rounded-lg">
                  <p className="text-white text-xs font-bold">🌍 {language === 'pt' ? 'Mundo' : language === 'en' ? 'World' : 'Mundo'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <span className="text-white text-xs">{language === 'pt' ? 'Oceano' : language === 'en' ? 'Ocean' : 'Océano'}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 bg-green-700 rounded"></div>
                    <span className="text-white text-xs">{language === 'pt' ? 'Terra' : language === 'en' ? 'Land' : 'Tierra'}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                {language === 'pt' ? '💡 Dica: Clique no mapa ou digite as coordenadas manualmente' :
                 language === 'en' ? '💡 Tip: Click on map or enter coordinates manually' :
                 '💡 Consejo: Clic en el mapa o ingresa coordenadas manualmente'}
              </p>
            </div>
            
            {/* Formulário de coordenadas */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">⌨️ {language === 'pt' ? 'Ou digite manualmente' : language === 'en' ? 'Or type manually' : 'O escribe manualmente'}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.latitude}</label>
                  <input 
                    type="number" 
                    step="0.000001" 
                    value={location.lat} 
                    onChange={(e) => setLocation({...location, lat: e.target.value})} 
                    placeholder="-21.17" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'pt' ? 'Entre -90 e 90' : language === 'en' ? 'Between -90 and 90' : 'Entre -90 y 90'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.longitude}</label>
                  <input 
                    type="number" 
                    step="0.000001" 
                    value={location.lon} 
                    onChange={(e) => setLocation({...location, lon: e.target.value})} 
                    placeholder="-47.81" 
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'pt' ? 'Entre -180 e 180' : language === 'en' ? 'Between -180 and 180' : 'Entre -180 y 180'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.radiusAnalysis}: <span className="text-green-600 font-bold">{location.radius}km</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={location.radius} 
                    onChange={(e) => setLocation({...location, radius: parseInt(e.target.value)})} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1km</span>
                    <span>10km</span>
                  </div>
                </div>
                
                {/* Exemplos de localizações */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    📍 {language === 'pt' ? 'Exemplos:' : language === 'en' ? 'Examples:' : 'Ejemplos:'}
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setLocation({lat: '-21.1704', lon: '-47.8103', radius: location.radius})}
                      className="w-full text-left text-xs bg-white p-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      <span className="font-semibold">🇧🇷 Ribeirão Preto, Brasil</span>
                      <br />
                      <span className="text-gray-600">-21.1704, -47.8103</span>
                    </button>
                    <button
                      onClick={() => setLocation({lat: '41.8781', lon: '-87.6298', radius: location.radius})}
                      className="w-full text-left text-xs bg-white p-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      <span className="font-semibold">🇺🇸 Chicago, USA</span>
                      <br />
                      <span className="text-gray-600">41.8781, -87.6298</span>
                    </button>
                    <button
                      onClick={() => setLocation({lat: '40.4168', lon: '-3.7038', radius: location.radius})}
                      className="w-full text-left text-xs bg-white p-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      <span className="font-semibold">🇪🇸 Madrid, España</span>
                      <br />
                      <span className="text-gray-600">40.4168, -3.7038</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Botões de ação */}
          <div className="mt-8 space-y-3">
            <button 
              onClick={startQuiz} 
              disabled={!location.lat || !location.lon} 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {location.lat && location.lon ? `✅ ${t.startQuiz}` : `⚠️ ${language === 'pt' ? 'Selecione uma localização' : language === 'en' ? 'Select a location' : 'Selecciona una ubicación'}`}
            </button>
            
            <button 
              onClick={() => setGameState('menu')} 
              className="w-full text-gray-600 hover:text-gray-800 font-semibold"
            >
              ← {t.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <Satellite className="w-24 h-24 text-white mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold text-white mb-4">{t.loading}</h2>
          <p className="text-xl text-green-200">{t.downloadingData} 🛰️</p>
        </div>
      </div>
    );
  }

  if (gameState === 'quiz' && questions.length > 0) {
    const q = questions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-blue-900 p-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div><Award className="w-6 h-6 text-yellow-500 inline mr-2" /><span className="font-bold">{t.points}: {score}</span></div>
            <div className="font-semibold">{t.question} {currentQuestion + 1}/{questions.length}</div>
            <div><TrendingUp className="w-6 h-6 text-green-500 inline" /> {Math.round((score/100)*100)}%</div>
          </div>
          <div className="bg-white rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-3"><Satellite className="w-5 h-5 text-blue-600" /><h3 className="font-bold">🌍 {t.yourRegion}</h3></div>
            <div className="relative rounded-xl overflow-hidden border-4 border-green-500 h-64 bg-gradient-to-br from-green-800 to-green-600">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-400 rounded-full opacity-50 blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full opacity-40 blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"><MapPin className="w-10 h-10 text-red-600 animate-bounce" fill="#dc2626" /></div>
              <div className="absolute top-3 left-3 bg-black bg-opacity-70 px-3 py-2 rounded-lg text-white text-xs">📍 {location.lat}, {location.lon}</div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{q.icon}</div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold inline-block mb-4">{q.dataSource}</div>
              <h3 className="text-2xl font-bold text-gray-800">{q.question}</h3>
            </div>
            <div className="space-y-3 mb-6">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => !showExplanation && handleAnswer(i)} disabled={showExplanation} className={`w-full p-4 rounded-xl text-left font-semibold transition-all ${selectedAnswer === i ? (i === q.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : (showExplanation && i === q.correct ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100 hover:bg-gray-200')}`}>
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            {showExplanation && (
              <div className={`p-6 rounded-xl ${selectedAnswer === q.correct ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
                <p className="text-gray-800 mb-4">{selectedAnswer === q.correct ? q.explanation.correct : q.explanation.wrong}</p>
                <button onClick={nextQuestion} className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                  {currentQuestion < questions.length - 1 ? `${t.next} →` : `${t.seeResult} 🏆`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    const pct = Math.round((score / 100) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <Award className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{pct >= 60 ? `🎉 ${t.congratulations}` : `📚 ${t.keepLearning}`}</h2>
          <div className="text-6xl font-bold text-green-600 mb-2">{score}</div>
          <div className="text-2xl text-gray-600 mb-8">{t.of} 100 {t.points.toLowerCase()} ({pct}%)</div>
          <button onClick={() => { setGameState('language'); setCurrentQuestion(0); setScore(0); setSelectedAnswer(null); setShowExplanation(false); }} className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-green-700 hover:to-blue-700">
            🔄 {t.playAgain}
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AgroSpaceQuiz;
