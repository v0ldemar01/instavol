export default async (url, method, body, token) => {
  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': `Bearer ${token}`
  }
  //if (url !== '/api/auth') headers['Authorization'] = `Bearer ${token}`;
  console.log(body);
  if (typeof body === 'object') body = JSON.stringify(body);
  console.log(body);
  console.log(url, {method, body, headers})
  const response = await fetch(url, {method, body, headers});
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something was wrong');
  }
  return data;
}  