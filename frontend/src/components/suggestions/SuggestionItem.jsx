function SuggestionItem({ suggestion }) {
  return (
    <tr className='hover'>
      <th>{suggestion.idsuggestions}</th>
      <td>{suggestion.name}</td>
      <td>{suggestion.last_name}</td>
      <td>{suggestion.subject}</td>
      <td>{suggestion.message}</td>
      <td>{suggestion.created_at.split("T", 1)}</td>
      <td>{suggestion.is_pending ? "Pendiente" : "Revisado"}</td>
    </tr>
  );
}

export default SuggestionItem;
