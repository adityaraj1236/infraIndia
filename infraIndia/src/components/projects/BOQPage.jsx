import React, { useEffect, useState } from "react";
import { Table, Button, ScrollArea, Paper, Text } from "@mantine/core";
import axios from "axios";
import { useParams } from "react-router-dom";

const BOQPage = () => {
  const { taskId } = useParams();
  const [boqData, setBoqData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${taskId}/boq`).then((res) => setBoqData(res.data));
  }, [taskId]);

  return (
    <Paper shadow="md" p="lg">
      <Text size="lg" weight={500} mb="md">Bill of Quantities</Text>
      <ScrollArea>
        <Table striped highlightOnHover withBorder>
          <thead>
            <tr>
              <th>Item</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {boqData.length > 0 ? (
              boqData.map((row, index) => (
                <tr key={index}>
                  <td>{row.item}</td>
                  <td>{row.description}</td>
                  <td>{row.quantity}</td>
                  <td>{row.unit}</td>
                  <td>{row.rate}</td>
                  <td>{row.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" align="center">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
      <Button mt="md">Add BOQ Item</Button>
    </Paper>
  );
};

export default BOQPage;
