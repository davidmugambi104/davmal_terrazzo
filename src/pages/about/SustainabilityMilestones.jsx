import React from "react";

export default function SustainabilityMilestones() {
  const milestones = [
    { id: 1, title: "Carbon Neutrality Achieved", date: "2023-01-15" },
    { id: 2, title: "100% Renewable Energy Usage", date: "2023-06-10" },
    { id: 3, title: "Plastic-Free Packaging", date: "2023-09-05" },
  ];

  return (
    <div className="sustainability-milestones p-4 rounded-lg bg-green-100">
      <h4 className="text-lg font-semibold mb-3">Sustainability Milestones</h4>
      <ul className="space-y-2">
        {milestones.map((milestone) => (
          <li key={milestone.id} className="flex justify-between">
            <span>{milestone.title}</span>
            <span className="text-sm text-gray-500">{milestone.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
