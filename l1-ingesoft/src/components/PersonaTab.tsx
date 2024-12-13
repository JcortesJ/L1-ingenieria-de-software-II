'use client'
import dataPersonas from "@/testdata/dataPersona"
import { useState } from "react"
import PersonaCard from "./PersonaCard"

const PersonaTab = () => {
    const [personas, setPersonas] = useState(dataPersonas)
    return(
        <div className="flex flex-row flex-wrap gap-4 ">
            {personas.map((persona, index) => (
                <PersonaCard persona={persona} key={index}/>
            ))}

        </div>
    )
}

export default PersonaTab