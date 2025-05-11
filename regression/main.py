import pandas as pd
from sklearn.linear_model import LinearRegression


data = pd.read_csv('data_set.csv') 


X = data[['temperature', 'humidity']] 
y = data['status'] 


model = LinearRegression()
model.fit(X, y)


intercept = model.intercept_
coefficients = model.coef_


print(f"Intercept: {intercept:.4f}")
print(f"Coefficients: temperature = {coefficients[0]:.4f}, humidity = {coefficients[1]:.4f}")


y_pred = model.predict(X)
print("\nDự đoán mẫu (5 dòng đầu tiên):")
for i in range(5):
    print(f"Dữ liệu: temperature={X.iloc[i, 0]:.1f}, humidity={X.iloc[i, 1]:.1f}, "
          f"status thực tế={y.iloc[i]}, status dự đoán={round(y_pred[i])}")