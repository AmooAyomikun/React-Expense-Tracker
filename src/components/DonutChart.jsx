import React from 'react'

const DonutChart = ({data}) => {
    if (!data || data.length === 0) return <p>No data available</p>

    let currentPercent = 0

    const gradientParts = data.map((item) => {
        const start = currentPercent;
        const end = currentPercent + Number(item.percentage)

        currentPercent = end
        return `${item.color} ${start}% ${end}%`
    })

    const gradient = `conic-gradient(${gradientParts.join(",")})`
  return (
    <div className="donut-chart-wrapper donut-chart">
        <div className="donut-circle" style={{background: gradient}}>
        </div>
        <div className="donut-legend">
            {data.map((item) => (
                <div className="legend-item" key={item.label}>
                    <span className='legend-color-dot' style={{backgroundColor: item.color}}></span>
                    <span className='legend-text'>
                        {item.label}
                        {" "}
                        ({item.percentage}%)
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DonutChart