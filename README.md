```js
useEffect(() => {
  let value = JSON.stringify(valueOf(person))
  localStorage.setItem("family-tree", value);
});
  
const initial = JSON.parse(localStorage.getItem("family-tree") || "{}");
```