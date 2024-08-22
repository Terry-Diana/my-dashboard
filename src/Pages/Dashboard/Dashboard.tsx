// src/pages/Dashboard.tsx
import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NewsWidget from "../../Components/NewsWidget/NewsWidget";
import JokeWidget from "../../Components/JokeWidget/JokeWidget";
import CryptoWidget from "../../Components/CryptoWidget/CryptoWidget";
import WeatherWidget from "../../Components/WeatherWidget/WeatherWidget";
import TodoListWidget from "../../Components/TodoListWidget/TodoListWidget";
import { useTodoList } from "../../Hooks/useTodoList";
import { useFetchNews } from "../../Hooks/useFetchNews";
import { useFetchJoke } from "../../Hooks/useFetchJoke";
import { useFetchCrypto } from "../../Hooks/useFetchCrypto";
import { useFetchWeather } from "../../Hooks/useFetchWeather";

import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const {
    data: weather,
    loading: weatherLoading,
    error: weatherError,
  } = useFetchWeather("Nairobi");

  const {
    data: crypto,
    loading: cryptoLoading,
    error: cryptoError,
  } = useFetchCrypto();

  const { data: news, loading: newsLoading, error: newsError } = useFetchNews();

  const {
    todos,
    loading: todoLoading,
    error: todoError,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    clearTodos,
  } = useTodoList();

  const { data: joke, loading: jokeLoading, error: jokeError } = useFetchJoke();

  return (
    <div className="dashboard">
      <Header />
      <div className="widgets-container">
      <WeatherWidget
      className="weather-widget"
        weather={weather}
        loading={weatherLoading}
        error={weatherError}
      />
            <TodoListWidget
        todos={todos}
        loading={todoLoading}
        error={todoError}
        addTodo={addTodo}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
        clearTodos={clearTodos}
      />
      <CryptoWidget
        crypto={crypto}
        loading={cryptoLoading}
        error={cryptoError}
      />
      <NewsWidget news={news} loading={newsLoading} error={newsError} />

      <JokeWidget joke={joke} loading={jokeLoading} error={jokeError} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
