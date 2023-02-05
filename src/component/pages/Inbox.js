import { useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mail-slice";
import ViewMail from "./ViewMail";

const Inbox = () => {
  const dispatch = useDispatch();
  const receivedMail = useSelector((state) => state.mail.receivedMail);
  const senderMail = useSelector((state) => state.auth.email);
  const email = senderMail.replace("@", "").replace(".", "");
  console.log(receivedMail)
  const viewMailHandler = async (mail) => {
    await fetch(
      `https://mailbox-client-2ab38-default-rtdb.firebaseio.com/rec${email}/${mail.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...mail, isRead: true }),
      }
    );
    console.log(mail.id)
    dispatch(mailActions.viewMailHandle({id: mail.id}));
  };

  const fetchReceivedMail = async () => {
    const response = await fetch(
      `https://mailbox-client-2ab38-default-rtdb.firebaseio.com/rec${email}.json`
    );
    if (!response.ok) {
      throw new Error("Could not fetch sent mail");
    }
    const data = await response.json();
    const newData = [];
    for (let key in data) {
      newData.push({ id: key, ...data[key] });
    }
    dispatch(mailActions.updateReceivedMail({ mail: newData }));
    console.log(newData);
  };

  useEffect(() => {
    fetchReceivedMail();
  }, []);

  return (
    <Card>
      <Card.Header>Inbox</Card.Header>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>.</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Sender</th>
          </tr>
        </thead>
        <tbody>
          {receivedMail.map((mail) => (
            <tr key={mail.id}>
              <td style={{ color: "blue", fontSize: "40px" }}>
                {!mail.isRead && "."}
              </td>
              <td>{mail.subject}</td>
              <td>{mail.body}</td>
              <td>{mail.sender}</td>
              <td>
                <Button variant="success" onClick={() => viewMailHandler(mail)}>
                  View
                </Button>
              </td>
              <ViewMail message={mail.body} />
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default Inbox;
