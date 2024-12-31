import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });
const fetchAnalyticsData = createAsyncThunk(
    "/analytics/getAnalyticsData", async () => {
    try {
        const response = await axios.get("localhost:5000/api/admin/analytics");
        setAnalyticsData(response.data.analyticsData);
    } catch (error) {
        console.error("Error fetching analytics data:", error);
    } finally {
        setIsLoading(false);
    }
    return response.data;
});

const fetchDailySalesData = createAsyncThunk(
    "/analytics/getDailySalesData", async () => {
    try {
        const response = await axios.get("localhost:5000/api/admin/analytics");
        setDailySalesData(response.data.dailySalesData);
    } catch (error) {
        console.error("Error fetching analytics data:", error);
    } finally {
        setIsLoading(false);
    }
    return response.data;
});