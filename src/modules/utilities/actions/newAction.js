export default async function newAction({ request }) {
    console.log('article creation requested, request object: ',  request);


    const data = await request.formData();
    const jsonData = Object.fromEntries(data);
    console.log(jsonData);
}