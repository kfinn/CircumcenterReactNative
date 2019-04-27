import camelize from 'camelize';

export default async function circumcenterResponse(fetchPromise: Promise<Response>) {
  const fetchPromiseResponse = await fetchPromise;
  const rawJson = await fetchPromiseResponse.json();
  return camelize(rawJson);
}
