import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Component from '/Users/pietrozullo/mcp-use/test/create-mcp-use-app-baby/test/resources/display-weather.tsx'

const container = document.getElementById('widget-root')
if (container && Component) {
  const root = createRoot(container)
  root.render(<Component />)
}
