import React from "react";


const ColoredLine = ({ color }) => (
    <hr
        style={{
            
            color: color,
            backgroundColor: color,
            height: 10,
        }}
    />
);

  
export default ColoredLine;