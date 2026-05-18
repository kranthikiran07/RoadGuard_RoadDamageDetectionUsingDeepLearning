import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  Legend
} from 'recharts';

const METRICS_DATA = [
  { subject: 'Precision', YOLOv5: 85, YOLOv7: 91, YOLOv8: 94, fullMark: 100 },
  { subject: 'Recall', YOLOv5: 78, YOLOv7: 85, YOLOv8: 89, fullMark: 100 },
  { subject: 'Accuracy', YOLOv5: 82, YOLOv7: 88, YOLOv8: 92, fullMark: 100 },
  { subject: 'F1 Score', YOLOv5: 81, YOLOv7: 87, YOLOv8: 91, fullMark: 100 },
  { subject: 'mAP@50', YOLOv5: 75, YOLOv7: 82, YOLOv8: 88, fullMark: 100 },
];

const COMPARISON_DATA = [
  { name: 'YOLOv5', Precision: 85, Accuracy: 82, Recall: 78, F1: 81 },
  { name: 'YOLOv7', Precision: 91, Accuracy: 88, Recall: 85, F1: 87 },
  { name: 'YOLOv8', Precision: 94, Accuracy: 92, Recall: 89, F1: 91 },
];

export function PerformanceGraphs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Radar Comparison */}
      <div className="glass-morphism p-8 rounded-3xl min-h-[400px]">
        <h3 className="text-xl font-display font-bold mb-6 text-neon-blue">Model Metrics Comparison</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={METRICS_DATA}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
              <Radar
                name="YOLOv8"
                dataKey="YOLOv8"
                stroke="#00f2ff"
                fill="#00f2ff"
                fillOpacity={0.5}
              />
              <Radar
                name="YOLOv7"
                dataKey="YOLOv7"
                stroke="#9d00ff"
                fill="#9d00ff"
                fillOpacity={0.3}
              />
               <Radar
                name="YOLOv5"
                dataKey="YOLOv5"
                stroke="#475569"
                fill="#475569"
                fillOpacity={0.2}
              />
              <Legend />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(5, 5, 5, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Accuracy */}
      <div className="glass-morphism p-8 rounded-3xl min-h-[400px]">
        <h3 className="text-xl font-display font-bold mb-6 text-neon-blue">Object Detection Accuracy (%)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMPARISON_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 242, 255, 0.05)' }}
                contentStyle={{ backgroundColor: 'rgba(5, 5, 5, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px' }}
              />
              <Bar dataKey="Precision" fill="#00f2ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Accuracy" fill="#9d00ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#475569" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
