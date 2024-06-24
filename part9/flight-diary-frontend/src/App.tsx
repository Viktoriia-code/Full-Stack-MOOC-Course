import { useEffect, useState } from 'react'
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [notes, setNotes] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    getAllDiaries().then(data => {
      setNotes(data)
    })
  }, [])

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  
  const noteCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const data = await createDiary({ 
        date: newDate, 
        weather: newWeather as Weather, 
        visibility: newVisibility as Visibility, 
        comment: newComment 
      });
      setNotes(notes.concat(data));
      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
      setNewComment('');
    } catch (error) {
      notify(String(error));
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={noteCreation}>
        <label>
          date
          <input
            type='date'
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)} 
          />
        </label>
        <div style={{display: 'flex', gap: '10px'}}>
          visibility
          <label>
            great
            <input
              onChange={() => setNewVisibility('great')}
              type="radio"
              name='visibility'
              checked={newVisibility === "great"}
            />
          </label>
          <label>
            good
            <input
              onChange={() => setNewVisibility('good')}
              type="radio"
              name='visibility'
              checked={newVisibility === "good"}
            />
          </label>
          <label>
            ok
            <input
              onChange={() => setNewVisibility('ok')}
              type="radio"
              name='visibility'
              checked={newVisibility === "ok"}
            />
          </label>
          <label>
            poor
            <input
              onChange={() => setNewVisibility('poor')}
              type="radio"
              name='visibility'
              checked={newVisibility === "poor"}
            />
          </label>
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
          weather
          <label>
            sunny
            <input
              type='radio'
              name='weather'
              onChange={() => setNewWeather('sunny')}
              checked={newWeather === "sunny"}
            />
          </label>
          <label>
            rainy
            <input
              type='radio'
              name='weather'
              onChange={() => setNewWeather('rainy')} 
              checked={newWeather === "rainy"}
            />
          </label>
          <label>
            cloudy
            <input
              type='radio'
              name='weather'
              onChange={() => setNewWeather('cloudy')}
              checked={newWeather === "cloudy"}
            />
          </label>
          <label>
            stormy
            <input
              type='radio'
              name='weather'
              onChange={() => setNewWeather('stormy')}
              checked={newWeather === "stormy"}
            />
          </label>
          <label>
            windy
            <input
              type='radio'
              name='weather'
              onChange={() => setNewWeather('windy')}
              checked={newWeather === "windy"} 
            />
          </label>
        </div>
        <label>
          comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)} 
          />
        </label><br />
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {notes.map(note =>
          <div key={note.id}>
            <h3>{note.date}</h3>
            <span>visibility: {note.visibility}</span><br />
            <span>weather: {note.weather}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
