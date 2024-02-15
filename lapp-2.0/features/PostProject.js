export const SaveProject = async (values) => {
  console.log(values);
  const response = await fetch("api/project", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log("hello");
    throw new Error(response.statusText);
  }

  console.log("done here");

//   router.push("/projects/list");
  return await response.json();
};
