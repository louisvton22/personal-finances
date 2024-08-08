SELECT 
    category,
    SUM(amount) as total
FROM {{ ref("transactions") }}
GROUP BY category