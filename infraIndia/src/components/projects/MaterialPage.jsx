import React from "react";
import { Table, Paper, Text, Button } from "@mantine/core";

const MaterialPage = () => {
  return (
    <Paper shadow="md" p="lg">
      <Text size="lg" weight={500} mb="md">Material Tracking</Text>
      <Table>
        <thead>
          <tr>
            <th>Material</th>
            <th>Supplier</th>
            <th>Cost</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cement</td>
            <td>XYZ Supplier</td>
            <td>₹5000</td>
            <td>100 Bags</td>
            <td>In Stock</td>
          </tr>
        </tbody>
      </Table>
      <Button mt="md">Add Material</Button>
    </Paper>
  );
};

export default MaterialPage;
