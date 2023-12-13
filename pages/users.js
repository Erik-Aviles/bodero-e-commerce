import axios from "axios";

function UsersPage({ users }) {
  return (
    <main>
      {users?.map((user, index) => (
        <div key={index}>{user.email}</div>
      ))}
    </main>
  );
}

export default UsersPage;

export async function getServerSideProps() {
  const res = await axios(`${process.env.URL}/api/users`);
  const { users } = res.data;

  return {
    props: { users: JSON.parse(JSON.stringify(users)) },
  };
}
