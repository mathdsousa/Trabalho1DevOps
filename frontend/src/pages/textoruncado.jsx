import { useState } from "react";

function TextoTruncado({ conteudo }) {
    const [expandido, setExpandido] = useState(false);

    return (
        <div className="text-center text-white px-4">
            <p className={expandido ? "" : "truncate"}>
                {conteudo}
            </p>
            <button
                className="text-blue-400 mt-2 underline"
                onClick={() => setExpandido(!expandido)}
            >
                {expandido ? "Ver menos" : "Ver mais"}
            </button>
        </div>
    );
}

export default TextoTruncado;