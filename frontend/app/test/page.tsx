
async function getData() {
    const res = await fetch(`http://localhost:1337/api/posts?populate[cover][fields][0]=url`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
}



export default async function Test() {
    const { data: posts, meta } = await getData()
    console.log("结果:" + JSON.stringify(posts))

    const listItems = posts.map((post: any) =>
        <li>{post.attributes.title}</li>
    );
    return (
        <ul>
            {listItems}
        </ul>
    )
}