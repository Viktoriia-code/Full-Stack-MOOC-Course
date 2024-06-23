import { useEffect, useState } from 'react'
import { DiaryEntry } from './types';
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
        weather: newWeather, 
        visibility: newVisibility, 
        comment: newComment 
      });
      setNotes(notes.concat(data));
      // Clear input fields after successful creation
      setNewDate('');
      setNewVisibility('');
      setNewWeather('');
    } catch (error) {
      // Handle the error appropriately in the UI
      console.error(error);
      // Optionally, display an error message to the user
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
