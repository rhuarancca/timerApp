import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const dataC = [
  { name: 'Item 1', value: 30 },
  { name: 'Item 2', value: 20 },
  { name: 'Item 3', value: 40 },
  { name: 'Item 4', value: 10 },
];
  const total = dataC.reduce((sum, item) => sum + item.value, 0);

  const getPath = (startAngle: number, endAngle: number) => {
    const radius = 50;
    const x1 = 50 + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = 50 + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = 50 + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = 50 + radius * Math.sin((Math.PI * endAngle) / 180);

    return `M50,50 L${x1},${y1} A50,50 0 ${endAngle - startAngle > 180 ? 1 : 0} 1 ${x2},${y2} Z`;
  };

  let startAngle = 0;


const screenWidth = Dimensions.get('window').width;

const TimeTrackingDashboard = () => {
  const data = {
    labels: ['  Mon         ', '  Tue         ', '  Wed         ', '  Thu         ', '  Fri         ', '  Wed          ', '  Sun          '],
    values: [4, 5, 3, 12, 6, 6, 10], 
  };

  const maxValue = Math.max(...data.values); 



  const teamData = [
    { name: 'Annie', activity: 'Break', timeSpent: '0:10', status: 'In progress', value: 30  },
    { name: 'Oliver', activity: 'Work - Project X', timeSpent: '5:20', status: 'In progress', value: 20  },
    { name: 'Mark', activity: 'Client meeting - Office', timeSpent: '5:30', status: 'Completed', value: 40  },
    { name: 'Zoe', activity: 'Lunch - Time-off', timeSpent: '1:30', status: 'Completed', value: 10  },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de Seguimiento de Tiempo</Text>

      <View style={styles.chartContainer}>
        <Text>Horas Trabajadas Esta Semana</Text>
        <Svg width={screenWidth - 60} height={220}>
          {data.values.map((value, index) => (
            <Rect
              key={index}
              x={index * ((screenWidth - 40) / data.labels.length)}
              y={220 - (value / maxValue) * 200}
              width={(screenWidth - 60) / data.labels.length - 10} 
              height={(value / maxValue) * 200}
              
              fill="rgba(134, 65, 244, 0.8)"
            />
          ))}
        </Svg>
        
        <Text>{data.labels}</Text>
      </View>

      <Text style={styles.sectionTitle}>Actividades del Equipo</Text>



     
      <Text style={styles.title}>Gráfico de Porcentajes</Text>

      <View style={styles.svgContainer}>
      <Svg width="150" height="150" viewBox="0 0 100 100" >
        {(() => {
          const paths = [];
          for (let index = 0; index < dataC.length; index++) {
            const item = dataC[index];
            const endAngle = (item.value / total) * 360 + startAngle;
            const path = getPath(startAngle, endAngle);

            paths.push(
              <Path
                key={index}
                d={path}
                fill={index === 0 ? '#FF6347' : index === 1 ? '#4682B4' : index === 2 ? '#32CD32' : '#FFD700'}
              />
            );

            startAngle = endAngle;
          }
          return paths;
        })()}
      </Svg>
      </View>
      <View style={styles.legend}>
        {(() => {
          const legendItems = [];
          for (let index = 0; index < teamData.length; index++) {
            const item = teamData[index];
            legendItems.push(
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.colorBox,
                    {
                      backgroundColor:
                        index === 0
                          ? '#FF6347'
                          : index === 1
                          ? '#4682B4'
                          : index === 2
                          ? '#32CD32'
                          : '#FFD700',
                    },
                  ]}
                />
                
                <Text>
                {item.name} - {item.activity}
                </Text>
                <Text>  Tiempo: {item.timeSpent}, {item.status} : {item.value}%</Text>
              </View>
            );
          }
          return legendItems;
        })()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  activityItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  legend: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  svgContainer: {
    justifyContent: 'center',  
    alignItems: 'center',     
  },
});

export default TimeTrackingDashboard;
