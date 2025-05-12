import { Grid, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Compare as CompareIcon, Delete as DeleteIcon } from '@mui/icons-material';

export default function ComparePage({ comparedItems, removeFromCompare }) {
  const features = ['Процессор', 'Видеокарта', 'Оперативная память', 'Цена'];

  return (
    <Paper sx={{ p: 3, bgcolor: 'background.default' }}>
      <h2 style={{ color: 'primary.main' }}>Сравнение товаров</h2>
      {comparedItems.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Характеристика</TableCell>
                {comparedItems.map(item => (
                  <TableCell key={item.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {item.name}
                      <Button 
                        onClick={() => removeFromCompare(item.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </Button>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {features.map(feature => (
                <TableRow key={feature}>
                  <TableCell>{feature}</TableCell>
                  {comparedItems.map(item => (
                    <TableCell key={`${item.id}-${feature}`}>
                      {item.specs[feature.toLowerCase()] || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p style={{ color: 'text.secondary' }}>Добавьте товары для сравнения</p>
      )}
    </Paper>
  );
}