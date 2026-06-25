import React from 'react'

const BarChart = ({data}) => {
    if (!data || data.length === 0) return <p>No data available</p>
    const maxValue = Math.max(...data.map((item) => {
        return item.value
    }))

    return (
    <div className="bar-chart-wrapper bar-chart">
      <div className="bar-chart-canvas">
        {data.map((item, index) => {
          const barHeight = maxValue > 0 ? (item.value / maxValue) * 100 : 0

          return (
            <div key={index} className="bar-column">
              <div className="bar-container">
                <div 
                  className="bar-fill" 
                  style={{ height: `${barHeight}%` }}
                  title={`${item.label}: ₦${item.value}`}
                ></div>
              </div>
              <span className="bar-label">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
    )
}

export default BarChart