import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Slider,
    Button,
    Link,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
   
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { keyframes } from '@mui/system';

// Import your background image
import backgroundImage from '../assets/image/Frame .png'; // Adjust the path accordingly

// Define keyframes for the animations
const slideInLeft = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideInRight = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const LoanCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(5000);
    const [loanTenure, setLoanTenure] = useState(1);
    const [interestRate, setInterestRate] = useState(2);
    const [totalAmount, setTotalAmount] = useState(51000);
    const [dailyPayment, setDailyPayment] = useState(0);
    const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

    const handleLoanAmountChange = (event, newValue) => {
        setLoanAmount(newValue);
    };

    const handleLoanTenureChange = (event, newValue) => {
        setLoanTenure(newValue);
    };

    const handleInterestRateChange = (event, newValue) => {
        setInterestRate(newValue);
    };

    const calculateTotalAmount = () => {
        const totalInterest = (loanAmount * interestRate * loanTenure) / 100;
        const total = loanAmount + totalInterest;
        setTotalAmount(total);
        setDailyPayment((total / loanTenure).toFixed(2)); // Calculate daily payment
    };

    useEffect(() => {
        calculateTotalAmount();
    }, [loanAmount, loanTenure, interestRate]);

    const { ref: calculatorRef, inView: calculatorInView } = useInView({ triggerOnce: false });
    const { ref: detailsRef, inView: detailsInView } = useInView({ triggerOnce: false });

    // Function to handle showing the calculated amount in a dialog
    const handleShowCalculatedAmount = () => {
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    };

    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: { xs: '40px', md: '0' }, // No border radius on small screens, 40px on larger screens

                paddingY: 4, // Adds vertical padding
                backgroundColor: '#f9f9f9', // Dark overlay for readability
              
            }}
        >
            <Box sx={{ marginTop: 4, marginBottom: 4 }}>
                <Container>
                    <Typography  align="center" gutterBottom sx={{fontWeight:'bold', color: 'black',fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } // Adjust font size based on screen size
 }}>
                        Personal Loan Calculator
                    </Typography>
                    <Typography  align="center" gutterBottom sx={{ color: 'black',fontSize:{xs: '16px', sm: '22px' } }}>
                    "Easily estimate your loan details with our handy calculator. See how different loan amounts, tenures, and interest rates impact your total payable amount. Find out exactly what you'll owe and plan your finances confidently."                    </Typography>

                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={4}
                                sx={{
                                    mt:4,
                                    padding: 3,
                                    borderRadius: 10,
                                    textAlign: 'center',
                                    background: 'rgba(255, 255, 255, 0.4)', // Transparent background to see blur effect
                                    color: 'black',
                                    minHeight: '400px',
                                    animation: calculatorInView ? `${slideInLeft} 0.5s ease` : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                                ref={calculatorRef}
                            >
                                <Typography variant="h6" sx={{ marginBottom: 1,textAlign:'left' }}>
                                Loan Amount (₹)
                                </Typography>
                                <TextField
                                type="number"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    marginBottom: 2,   // margin at the bottom
                                    background: 'transparent',
                                    borderRadius: '16px',  // Rounded border
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',  // Ensure the border radius applies to the input field
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.23)',  // Default border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1976d2',  // Border color on hover
                                    },
                                }} 
                            />

                                <Slider
                                    value={loanAmount}
                                    min={5000}
                                    max={100000}
                                    onChange={handleLoanAmountChange}
                                    valueLabelDisplay="auto"
                                    marks={[{ value: 5000, label: '5K' }, { value: 100000, label: '100K' }]}
                                    sx={{
                                       
                                        color: 'black',
                                        height: 8,
                                        marginBottom: 2,
                                        '& .MuiSlider-markLabel[data-index="0"]': {
                                            transform: 'translateX(5%)', // Shift min label to the right
                                        },
                                        '& .MuiSlider-markLabel[data-index="1"]': {
                                            transform: 'translateX(-90%)', // Shift max label to the left
                                        },
                                    }}
                                />

                                <Typography variant="h6" sx={{ marginBottom: 1,textAlign:'left' }}>
                                    Loan Tenure (Days)
                                </Typography>
                                <TextField
                                type="number"
                                value={loanTenure}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    marginBottom: 2,   // margin at the bottom
                                    background: 'transparent',
                                    borderRadius: '16px',  // Rounded border
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',  // Ensure the border radius applies to the input field
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.23)',  // Default border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1976d2',  // Border color on hover
                                    },
                                }} 
                            />

                                <Slider
                                    value={loanTenure}
                                    min={1}
                                    max={90}
                                    onChange={handleLoanTenureChange}
                                    valueLabelDisplay="auto"
                                    marks={[{ value: 1, label: '1' }, { value: 90, label: '90' }]}
                                    sx={{
                                        color: 'black',
                                        height: 8,
                                        marginBottom: 2,
                                                        '& .MuiSlider-markLabel[data-index="0"]': {
                                                transform: 'translateX(5%)', // Shift min label to the right
                                            },
                                            '& .MuiSlider-markLabel[data-index="1"]': {
                                                transform: 'translateX(-90%)', // Shift max label to the left
                                            },
                                                        }}
                                />

                                <Typography variant="h6" sx={{ marginBottom: 1,textAlign:'left' }}>
                                    Interest Rate (%)
                                </Typography>
                                <TextField
                                type="number"
                                value={interestRate}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    marginBottom: 1,   // margin at the bottom
                                    background: 'transparent',
                                    borderRadius: '16px',  // Rounded border
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '16px',  // Ensure the border radius applies to the input field
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'rgba(0, 0, 0, 0.23)',  // Default border color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#1976d2',  // Border color on hover
                                    },
                                }} 
                            />

                                <Slider
                                    value={interestRate}
                                    min={0.8}
                                    max={2.75}
                                    step={0.1}
                                    onChange={handleInterestRateChange}
                                    valueLabelDisplay="auto"
                                    marks={[{ value: 0.8, label: '0.8%' }, { value: 2.75, label: '2.75%' }]}
                                    sx={{
                                        color: 'black',
                                        height: 8,
                                        marginBottom: 2,
                                        '& .MuiSlider-markLabel[data-index="0"]': {
                                            transform: 'translateX(5%)', // Shift min label to the right
                                        },
                                        '& .MuiSlider-markLabel[data-index="1"]': {
                                            transform: 'translateX(-90%)', // Shift max label to the left
                                        },
                                    }}
                                />
                                <Button
                                component={Link}
                            href="/apply-now"
                                    variant="contained"
                                    sx={{ marginTop: 2, backgroundColor: 'black', borderRadius: '16px',padding:2 }} 
                                >
                                    <Typography >₹{totalAmount}</Typography>
                                </Button>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={6}
                                sx={{
                                    mt:4,
                                    padding: 3,
                                    borderRadius: '30px',
                                    textAlign: 'center',
                                    background: 'rgba(255, 255, 255, 0.4)', // Transparent background to see blur effect
                                    color: 'black',
                                    minHeight: '400px',
                                    animation: detailsInView ? `${slideInRight} 0.5s ease` : 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                                ref={detailsRef}
                            >
                                <Typography variant="h4" gutterBottom style={{fontWeight:'bold', color: 'black',fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }}}> 
                                    Clarity in Lending                    
                                </Typography>
                                <Typography variant="h6">Detailed information to help you understand your financial commitment.</Typography>
                                <Typography style={{ marginTop: '50px',fontSize:'25px',font:"bold" }}>
                                    You have to pay
                                </Typography>

                                <Typography style={{ fontSize:'25px',font:'bold' }}>₹{totalAmount}</Typography>

                                <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '40px', // Adds spacing between the columns
                                            padding: '16px 0',
                                        }}
                                    >
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            borderBottom: 'none',
                                                            fontFamily: 'Inter, sans-serif', // Corrected font family
                                                            fontWeight: 500, // Corrected font weight
                                                        }}
                                                    >
                                                       <Typography variant="subtitle1">Interest Rate:</Typography>
                                            <Typography variant="h6">{interestRate}%</Typography>
                                        </TableCell>

                                        {/* Divider line */}
                                        <div style={{ borderLeft: '2px solid black', height: '50px', margin: '0 16px' }}></div>

                                        <TableCell align="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderBottom: 'none' }}>
                                            <Typography variant="subtitle1">Loan Tenure:</Typography>
                                            <Typography variant="h6">{loanTenure} days</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>


                            <Button
                            component={Link}
                            href="/apply-now" // Change this to your actual "Apply Now" URL
                            variant="contained"
                            sx={{ marginTop: 15.5, backgroundColor: 'black', borderRadius: '16px', padding: 2, textDecoration: 'none' }}
                            >
                            Apply Now
                            </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default LoanCalculator;
