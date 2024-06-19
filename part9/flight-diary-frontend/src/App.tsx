import { useEffect, useState } from 'react'
import { DiaryEntry } from './types';
import { getAllDiaries, createDiary } from './services/diaryService';

const App = () => {
  const [notes, setNotes] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');

  useEffect(() => {
    getAllDiaries().then(data => {
      setNotes(data)
    })
  }, [])

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({ date: newDate, weather: newWeather, visibility: newVisibility }).then(data => {
      setNotes(notes.concat(data))
    })

    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={noteCreation}>
        <label>
          date
          <input
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)} 
          />
        </label><br />
        <label>
          visibility
          <input
            value={newVisibility}
            onChange={(event) => setNewVisibility(event.target.value)} 
          />
        </label><br />
        <label>
          weather
          <input
            value={newWeather}
            onChange={(event) => setNewWeather(event.target.value)} 
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
