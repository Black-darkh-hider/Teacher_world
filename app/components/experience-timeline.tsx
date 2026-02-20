"use client"

interface TimelineItem {
  title: string
  subtitle?: string
  description?: string
  period?: string
  details?: Record<string, string | number>
}

export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="border-l-4 border-blue-600 pl-4 py-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900">{item.title}</p>
              {item.subtitle && <p className="text-gray-600 text-sm">{item.subtitle}</p>}
            </div>
            {item.period && <span className="text-gray-500 text-xs whitespace-nowrap ml-2">{item.period}</span>}
          </div>
          {item.description && <p className="text-gray-700 text-sm mt-1">{item.description}</p>}
          {item.details && (
            <div className="mt-2 space-y-1">
              {Object.entries(item.details).map(([key, value]) => (
                <p key={key} className="text-gray-600 text-xs">
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
