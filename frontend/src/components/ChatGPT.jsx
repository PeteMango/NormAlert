import React, {useState, useEffect} from 'react'

export const ChatGPT = () => {
    const [response, setResponse] = useState(null);
    const [mess, setMess] = useState("");
    const [cont, setCont] = useState([]);
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch('http://localhost:4000/first-aid', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: mess,
              context: cont,
            }),
          });
    
          const responseData = await res.json();
          setResponse(responseData);
          setAnswer(responseData.context);
          setCont(responseData.context);
          console.log("DONEEEeeeeeeeeee");
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        console.log("answer");
        console.log(answer);
      }, [answer]);
    
  return (
    <div>
        ChatGPT
        <form onSubmit={handleSubmit}>
            <label>Message: <input type="text" onChange={(e) => setMess(e.target.value)}></input></label>
            <button type="submit">submit</button>
        </form>
        {response ? (
            <div>
                Done
                {answer.map((item, index) => (
                    <div key={index}>
                    <h1>Person: {item.role}</h1>
                    <p className="text-red-500">{item.message}</p>
                    </div>
                ))}
            </div>
        ) : (
            <div>
                Loading...
            </div>
        )}
    </div>
  )
}
