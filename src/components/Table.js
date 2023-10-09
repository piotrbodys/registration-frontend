import "./Table.css";

const Table = ({ events, deleteEvent, ...rest }) => {
  console.log(events);
  return (
    <table {...rest}>
      <thead>
        <tr>
          <th>#</th>
          <th>Imię i Nazwisko</th>
          <th>Wydarzenie</th>
          <th>Miasto</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        {events.map((row, index) => {
          return (
            <tr key={row._id}>
              <td>{index}</td>
              <td>{row.name}</td>
              <td eventkey={row.event.key}>{row.event.val}</td>
              <td citykey={row.city.key}>{row.city.val}</td>
              <td>
                <button
                  onClick={() => {
                    deleteEvent(row._id);
                  }}
                  className="delete"
                >
                  Usuń
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;