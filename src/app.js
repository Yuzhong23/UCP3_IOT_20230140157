import Chart from 'chart.js/auto';
import jsonData from './data.json';

(function() {
  try {
    const dataSensor = jsonData.datasensorreport[0].sensordata;

    const labels = dataSensor.map(item => {
        const fixedTimestamp = item.timestamp.replace(/-(\d)T/, '-0$1T');
        const date = new Date(fixedTimestamp);
        return date.toLocaleDateString('id-ID'); 
    });
    
    const temperatureData = dataSensor.map(item => item.temperature);
    const humidityData = dataSensor.map(item => item.humidity);
    const pressureData = dataSensor.map(item => item.pressure);

    new Chart(document.getElementById('chartTemp'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temperatureData,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 0, 0, 0.2)'
        }]
      }
    });

    new Chart(document.getElementById('chartHum'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Humidity (%)',
          data: humidityData,
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)'
        }]
      }
    });

    new Chart(document.getElementById('chartPres'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pressure (hPa)',
          data: pressureData,
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.2)'
        }]
      }
    });

  } catch (error) {
    console.error(error);
  }
})();